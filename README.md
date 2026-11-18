# Mayakas Management System

A full-stack school-management application foundation for schools running both the Kenyan CBC and Cambridge curricula.

## Included in this first implementation

- Next.js App Router application with responsive school dashboard.
- Four roles: ADMIN, TEACHER, STUDENT and BURSAR.
- Password-hashed sign-in and signed, HTTP-only session cookies.
- Role-aware navigation and server-side route authorization.
- PostgreSQL / Prisma data model for students, guardians, staff, classes, subjects, attendance, fees, payments, expenses, examinations, results, assignments, submissions, lesson notes, announcements and audit logs.
- Working student registration and student listing.
- Working fee payment recording with receipt number and audit log.
- Dashboard metrics and financial/management summary pages.
- CBC and Cambridge curriculum separation in core academic records.

## Requirements

- Node.js 20+
- PostgreSQL 15+
- npm

## Run locally

1. Extract this project.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a PostgreSQL database named `mayakas_sms`.
4. Copy `.env.example` to `.env` and set a strong `SESSION_SECRET` and your database URL.
5. Create tables and generate Prisma client:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

6. Add demo accounts and starter subjects:

   ```bash
   npm run db:seed
   ```

7. Start the application:

   ```bash
   npm run dev
   ```

8. Open http://localhost:3000.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Administrator | admin@mayakas.school | ChangeMe123! |
| Teacher | teacher@mayakas.school | ChangeMe123! |
| Student | student@mayakas.school | ChangeMe123! |
| Bursar | bursar@mayakas.school | ChangeMe123! |

**Security:** Demo credentials are for local development only. Change or remove them before any real deployment. Use HTTPS, a production-grade secret, database backups, secure file storage and appropriate data-protection controls.

## Important implementation notes

This is a runnable MVP foundation, not yet a production-complete school ERP. The schema supports both curricula, but CBC rubrics and Cambridge grading scales need to be configured by the school before automatic report-card generation. Bulk attendance screens, staff registration, class/subject administration, assignment authoring/submission, lesson-note uploads, PDF report cards, parent access, payment-provider integration and advanced analytics are planned follow-on modules.

The file upload fields currently store resource URLs. Connect a private object-storage provider and validate file type/size before accepting real school documents. Do not expose student records or uploaded resources publicly.

## Recommended next delivery milestones

1. Complete CRUD screens for staff, classes, subjects, guardians and fee structures.
2. Build daily bulk attendance for students and staff.
3. Add curriculum-specific assessment configuration, grade calculation and printable report cards.
4. Add assignment publishing, student submissions, grading and lesson-note uploads.
5. Add downloadable financial reports, arrears ageing, expenditure controls and audit exports.
6. Add parent/guardian portal, notifications, backups and deployment automation.


## Operational features added in the next build

- Bulk daily attendance for students and staff, with Present / Absent / Late / Excused and "mark all present".
- Staff registration and staff directory.
- Class and subject setup with CBC/Cambridge separation.
- Examination creation, score entry and automatic grade assignment.
- Configurable grading-band database model; sensible default bands are provided as fallbacks. School-approved grade bands should be seeded before formal use.
- Printable browser report-card view (selective filtering via `?studentId=...&examinationId=...`).
- Homework creation and publishing.
- Lesson-note resource catalogue using secure resource URLs.
- Fee structures by curriculum, grade, academic year and term.
- Student fee balance report based on recorded fee structures and payments.
- Audit log entries for fee payments, attendance and results.

### Operational caveats

The report-card route is a print-friendly HTML view, not a signed/official PDF. The finance balance calculation currently totals all matching fee structures for a student's curriculum and grade, so the bursar must reconcile the intended school year/term and any discounts, scholarships, waivers or opening balances before relying on it as an official statement. A proper production rollout should add fee allocations/invoices per learner and term, refund/reversal workflows, maker-checker approvals, and reconciliation to bank/mobile-money statements.

Assignment submissions currently expose a protected API endpoint; the student-facing submission form and teacher grading inbox are still follow-on work. Lesson notes and homework attachments currently use URL fields; configure private object storage and signed access URLs for confidential content. The report-card default grading fallback is illustrative only; configure school-approved CBC and Cambridge grade bands before publishing results.


Additional learner workflows in this update:
- Students can view published homework and submit written responses or a resource URL when their login is linked to their Student profile.
- Teachers/admins can review submissions and record marks/feedback.
- Students can access their own printable report-card view; the report-card endpoint restricts student sessions to their linked profile.
- Admins can define curriculum-specific grading bands from Classes & subjects. Use school-approved grade boundaries and ensure bands do not overlap before recording formal marks.
