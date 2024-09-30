// File: app/api/sendEmail/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import validator from 'validator';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  limit: 10, // 10 requests per minute
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!limiter.check(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const { name, email, message } = await request.json();

    // Input validation and sanitization
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate and sanitize email
    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    const sanitizedEmail = validator.normalizeEmail(email) || '';

    // Validate and sanitize name and message
    const sanitizedName = validator.escape(validator.trim(name));
    const sanitizedMessage = validator.escape(validator.trim(message));

    // Length checks
    if (sanitizedName.length > 100) {
      return NextResponse.json({ error: 'Name is too long' }, { status: 400 });
    }
    if (sanitizedMessage.length > 1000) {
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
    }

    // Content checks (example: prevent specific words or patterns)
    const forbiddenWords = ['spam', 'scam', 'virus'];
    if (forbiddenWords.some(word => sanitizedMessage.toLowerCase().includes(word))) {
      return NextResponse.json({ error: 'Message contains forbidden content' }, { status: 400 });
    }

    console.log('Received request:', { 
      name: sanitizedName, 
      email: sanitizedEmail, 
      message: sanitizedMessage.substring(0, 20) + '...' 
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Environment variables EMAIL_USER or EMAIL_PASS are not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Form Submission" <${process.env.EMAIL_USER}>`,
      to: 'wassimbenchekroun0@gmail.com',
      subject: `Form submission from ${sanitizedName}`,
      text: `From: ${sanitizedName} (${sanitizedEmail})\n\nMessage: ${sanitizedMessage}`,
      html: `<p><strong>From:</strong> ${sanitizedName} (${sanitizedEmail})</p><p><strong>Message:</strong> ${sanitizedMessage}</p>`,
    };

    console.log('Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error: unknown) {
    console.error('Failed to send email:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to send email', details: 'An unknown error occurred' }, { status: 500 });
    }
  }
}