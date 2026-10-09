const http = require('http');

async function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const reqOptions = {
      hostname: u.hostname,
      port: u.port || 3000,
      path: u.pathname + u.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data,
          json,
        });
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting Struggle of Students (SS) Automated Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Pages rendering check
    console.log('📌 Test Group 1: Page Renders (HTTP 200)');
    const pages = [
      '/',
      '/join',
      '/events',
      '/opportunities',
      '/team',
      '/placements',
      '/services',
      '/meetings',
      '/contact',
      '/admin/login',
    ];

    for (const p of pages) {
      const res = await request(`http://localhost:3000${p}`);
      assert(res.status === 200, `Page ${p} returned HTTP 200`);
    }

    // 2. Join Community Registration
    console.log('\n📌 Test Group 2: Join Community Form & Database Persistence');
    const memberPayload = {
      fullName: 'Devika Sharma',
      email: `devika.test.${Date.now()}@college.edu`,
      phone: '+91 98765 99887',
      college: 'Delhi Technological University',
      degree: 'B.Tech IT',
      graduationYear: '2026',
      interests: ['Tech & Software Development', 'Campus Event Management'],
      reason: 'Excited to build with the SS student team!',
    };

    const memberRes = await request('http://localhost:3000/api/members/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: memberPayload,
    });

    assert(memberRes.status === 200, 'Member registration returns HTTP 200');
    assert(memberRes.json?.success === true, 'Registration reports success');
    assert(
      memberRes.json?.member?.membershipNumber?.startsWith('SS-2026-'),
      `Generated unique Membership ID: ${memberRes.json?.member?.membershipNumber}`
    );

    // Duplicate registration check
    const dupRes = await request('http://localhost:3000/api/members/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: memberPayload,
    });
    assert(dupRes.status === 409, 'Duplicate email registration rejected with HTTP 409');

    // 3. Events & Volunteer Capacity Check
    console.log('\n📌 Test Group 3: Events & Volunteer Capacity Quotas');
    // Test 3a: Event that is full ('acoustic-euphoria-2026' has 8/8 slots filled in seed)
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const fullEvent = await prisma.event.findUnique({
      where: { slug: 'acoustic-euphoria-2026' },
    });

    assert(Boolean(fullEvent), 'Found Acoustic Euphoria event in database');

    const volunteerFullRes = await request('http://localhost:3000/api/events/volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        eventId: fullEvent.id,
        fullName: 'Test Applicant',
        email: `overbook.${Date.now()}@test.edu`,
        phone: '+91 99887 76655',
        college: 'Test College',
        skills: 'Sound Check',
      },
    });

    assert(
      volunteerFullRes.status === 409,
      'Full volunteer slots reject new applications with HTTP 409 (Overbooking prevented!)'
    );
    assert(
      volunteerFullRes.json?.error?.includes('Volunteer Slots Full'),
      'Returned "Volunteer Slots Full" error message'
    );

    // Test 3b: Event with open slots ('ss-hacknite-2026' has 5/12 slots filled)
    const openEvent = await prisma.event.findUnique({
      where: { slug: 'ss-hacknite-2026' },
    });

    const volunteerOpenRes = await request('http://localhost:3000/api/events/volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        eventId: openEvent.id,
        fullName: 'New Volunteer',
        email: `volunteer.${Date.now()}@test.edu`,
        phone: '+91 91234 56789',
        college: 'NSUT',
        skills: 'Stage Logistics',
      },
    });

    assert(volunteerOpenRes.status === 200, 'Open event accepts volunteer application');
    assert(
      volunteerOpenRes.json?.slotsFilled === openEvent.volunteerSlotsFilled + 1,
      `Volunteer count incremented transactionally to ${volunteerOpenRes.json?.slotsFilled}`
    );

    // 4. Opportunities Hub & Tracking
    console.log('\n📌 Test Group 4: Opportunities Hub & Tracking');
    const opp = await prisma.opportunity.findFirst({ where: { isOpen: true } });
    assert(Boolean(opp), 'Found active opportunity');

    const appRes = await request('http://localhost:3000/api/opportunities/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        opportunityId: opp.id,
        fullName: 'Aarav Mehta',
        email: `aarav.${Date.now()}@tech.edu`,
        phone: '+91 98765 12345',
        college: 'IIT Delhi',
        resumeUrl: 'https://drive.google.com/test-resume',
        coverNote: 'Passionate about student developer tools.',
      },
    });

    assert(appRes.status === 200, 'Opportunity application submitted with HTTP 200');
    const refId = appRes.json?.referenceId;
    assert(refId && refId.startsWith('SS-APP-'), `Generated tracking Reference ID: ${refId}`);

    // Track status check
    const trackRes = await request(`http://localhost:3000/api/opportunities/track?query=${refId}`);
    assert(trackRes.status === 200, 'Tracking lookup returned HTTP 200');
    assert(
      trackRes.json?.applications?.length > 0,
      `Found submitted application via reference ID with status: ${trackRes.json?.applications[0]?.status}`
    );

    // 5. Service Enquiry
    console.log('\n📌 Test Group 5: Service Enquiries (SS Band / Event Production / IT)');
    const enqRes = await request('http://localhost:3000/api/services/enquire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        serviceName: 'SS Band',
        clientName: 'Cultural Secretary',
        organizationOrCollege: 'SRCC Youth Fest Committee',
        email: 'srcc.fest@du.ac.in',
        phone: '+91 98111 44332',
        description: 'Requesting 2-hour headline live performance for annual college fest.',
      },
    });

    assert(enqRes.status === 200, 'Service enquiry saved to database with HTTP 200');

    // 6. Online Meetings & Private Link Protection
    console.log('\n📌 Test Group 6: Online Meetings & Link Protection');
    const meeting = await prisma.onlineMeeting.findFirst({ where: { isPublished: true } });
    assert(Boolean(meeting), 'Found published online meeting');

    const meetingRegRes = await request('http://localhost:3000/api/meetings/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        meetingId: meeting.id,
        fullName: 'Rohan Gupta',
        email: `rohan.${Date.now()}@college.edu`,
        phone: '+91 98888 77777',
        college: 'BITS Pilani',
      },
    });

    assert(meetingRegRes.status === 200, 'Meeting registration confirmed with HTTP 200');
    assert(Boolean(meetingRegRes.json?.accessCode), `Received private access code: ${meetingRegRes.json?.accessCode}`);
    assert(Boolean(meetingRegRes.json?.meetingUrl), 'Private meeting link revealed securely to registered participant');

    // 7. Contact Message
    console.log('\n📌 Test Group 7: Contact Message Submission');
    const contactRes = await request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        fullName: 'Campus Ambassador Applicant',
        email: 'applicant@college.edu',
        phone: '+91 98765 00000',
        topic: 'PARTNERSHIP',
        subject: 'Starting SS Chapter in Bangalore',
        message: 'We have 200+ students ready to join Struggle of Students in our campus.',
      },
    });

    assert(contactRes.status === 200, 'Contact message saved to database with HTTP 200');

    // 8. Admin Authentication & Role-Based Access
    console.log('\n📌 Test Group 8: Admin Authentication & Security');
    const loginRes = await request('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: 'admin@struggleofstudents.org',
        password: 'admin_ss_secret_2026',
      },
    });

    assert(loginRes.status === 200, 'Admin login succeeded with HTTP 200');
    const cookie = loginRes.headers['set-cookie']?.[0];
    assert(Boolean(cookie), 'Received secure HTTP-only admin session cookie');

    // Test Admin Me endpoint with cookie
    const adminMeRes = await request('http://localhost:3000/api/admin/me', {
      headers: { Cookie: cookie },
    });
    assert(adminMeRes.status === 200, 'Admin session verified via /api/admin/me');
    assert(adminMeRes.json?.admin?.email === 'admin@struggleofstudents.org', 'Admin identity verified');

    // Disconnect prisma
    await prisma.$disconnect();

    console.log(`\n==============================================`);
    console.log(`🎯 Test Summary: ${passed} Passed, ${failed} Failed`);
    console.log(`==============================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal error during test run:', err);
    process.exit(1);
  }
}

runTests();
