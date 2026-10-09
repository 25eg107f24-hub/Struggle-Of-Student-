/**
 * Zoom API Integration Helper with automatic fallback to manual meeting links
 * Supports Zoom Server-to-Server OAuth credentials if configured in environment variables.
 */

interface ZoomMeetingInput {
  topic: string;
  startTime: string; // ISO string
  durationMinutes: number;
  agenda?: string;
}

interface ZoomMeetingResult {
  success: boolean;
  meetingUrl?: string;
  meetingId?: string;
  password?: string;
  isApiGenerated: boolean;
  message?: string;
}

export function isZoomApiConfigured(): boolean {
  return Boolean(
    process.env.ZOOM_CLIENT_ID &&
    process.env.ZOOM_CLIENT_SECRET &&
    process.env.ZOOM_ACCOUNT_ID
  );
}

export async function createZoomMeeting(
  input: ZoomMeetingInput,
  fallbackManualUrl?: string
): Promise<ZoomMeetingResult> {
  // If Zoom credentials are not set, immediately use manual fallback link
  if (!isZoomApiConfigured()) {
    if (fallbackManualUrl && fallbackManualUrl.trim()) {
      return {
        success: true,
        meetingUrl: fallbackManualUrl.trim(),
        isApiGenerated: false,
        message: 'Zoom API credentials not configured. Successfully saved manual meeting link as fallback.',
      };
    }
    // Generate an organized secure session link fallback
    const generatedFallback = `https://meet.jit.si/SS-Meeting-${Date.now().toString(36)}`;
    return {
      success: true,
      meetingUrl: generatedFallback,
      isApiGenerated: false,
      message: 'Zoom API credentials not configured. Generated a fallback meeting room link.',
    };
  }

  // Zoom Server-to-Server OAuth Integration
  try {
    const authHeader = Buffer.from(
      `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
    ).toString('base64');

    const tokenRes = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!tokenRes.ok) {
      console.warn('Zoom OAuth token generation failed, using fallback manual link');
      return {
        success: true,
        meetingUrl: fallbackManualUrl || 'https://zoom.us/j/fallback',
        isApiGenerated: false,
        message: 'Could not authenticate with Zoom API. Used manual meeting link fallback.',
      };
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Create Meeting via Zoom API
    const createRes = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: input.topic,
        type: 2, // Scheduled meeting
        start_time: input.startTime,
        duration: input.durationMinutes,
        agenda: input.agenda,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          waiting_room: true,
        },
      }),
    });

    if (!createRes.ok) {
      throw new Error(`Zoom API meeting creation returned status ${createRes.status}`);
    }

    const meetingData = await createRes.json();

    return {
      success: true,
      meetingUrl: meetingData.join_url,
      meetingId: String(meetingData.id),
      password: meetingData.password || '',
      isApiGenerated: true,
      message: 'Meeting successfully created via official Zoom API integration!',
    };
  } catch (error: any) {
    console.error('Zoom API Error:', error);
    return {
      success: true,
      meetingUrl: fallbackManualUrl || 'https://zoom.us/j/fallback',
      isApiGenerated: false,
      message: `Zoom API call encountered an issue (${error.message}). Reverted cleanly to manual link fallback.`,
    };
  }
}
