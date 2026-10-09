import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import prisma from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'ss_super_secure_jwt_secret_token_genz_2026_xyz';
const COOKIE_NAME = 'ss_admin_token';

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function signToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getCurrentAdmin(): Promise<AdminPayload | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    // Verify admin still exists in database
    const admin = await prisma.admin.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!admin) return null;
    return admin;
  } catch {
    return null;
  }
}

export interface StudentPayload {
  id: string;
  email: string;
  membershipNumber: string;
  fullName: string;
}

export const STUDENT_COOKIE_NAME = 'ss_student_token';

export function signStudentToken(payload: StudentPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

export function verifyStudentToken(token: string): StudentPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as StudentPayload;
  } catch {
    return null;
  }
}

export async function getCurrentStudent(): Promise<StudentPayload | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(STUDENT_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyStudentToken(token);
    if (!payload) return null;

    const member = await prisma.communityMember.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, fullName: true, membershipNumber: true },
    });

    if (!member) return null;
    return member;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
