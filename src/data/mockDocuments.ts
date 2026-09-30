import { DocumentItem, CollectionItem, UserProfile, AppNotification, AuditLog } from '@/types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_demo_8829',
  name: 'Aditya Sharma',
  email: 'aditya.sharma@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  plan: 'Pro',
  storageUsed: 14250000, // ~14.25 MB
  storageLimit: 5368709120, // 5 GB
  totalQueries: 148,
  createdAt: '2025-01-15T09:30:00Z',
};

export const INITIAL_COLLECTIONS: CollectionItem[] = [
  {
    id: 'col_edu',
    userId: 'usr_demo_8829',
    name: 'Education & Academics',
    description: 'Degrees, transcripts, marksheets, semester grade cards, and academic achievements',
    category: 'Education',
    iconName: 'GraduationCap',
    color: '#3b82f6',
    documentCount: 3,
    isSmart: true,
    filterKeywords: ['b.tech', 'degree', 'marksheet', 'university', 'cgpa', 'semester', 'grade'],
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'col_id',
    userId: 'usr_demo_8829',
    name: 'Identity & Government IDs',
    description: 'National IDs, Passport, Aadhaar, PAN card, Driving license',
    category: 'Identity',
    iconName: 'ShieldCheck',
    color: '#10b981',
    documentCount: 2,
    isSmart: true,
    filterKeywords: ['passport', 'aadhaar', 'pan', 'identity', 'republic', 'citizen'],
    createdAt: '2025-01-16T11:00:00Z',
  },
  {
    id: 'col_work',
    userId: 'usr_demo_8829',
    name: 'Employment & Career',
    description: 'Resume, offer letters, internship certificates, experience letters',
    category: 'Employment',
    iconName: 'Briefcase',
    color: '#8b5cf6',
    documentCount: 2,
    isSmart: true,
    filterKeywords: ['resume', 'cv', 'internship', 'developer', 'company', 'employment', 'experience'],
    createdAt: '2025-01-18T14:30:00Z',
  },
  {
    id: 'col_bills',
    userId: 'usr_demo_8829',
    name: 'Bills & Utilities',
    description: 'Electricity, water, broadband, maintenance and monthly invoices',
    category: 'Bills',
    iconName: 'Receipt',
    color: '#f59e0b',
    documentCount: 1,
    isSmart: true,
    filterKeywords: ['bill', 'electricity', 'invoice', 'payable', 'power', 'kwh', 'due date'],
    createdAt: '2025-02-01T09:00:00Z',
  },
  {
    id: 'col_finance',
    userId: 'usr_demo_8829',
    name: 'Finance & Banking',
    description: 'Bank statements, tax filings, investment portfolios',
    category: 'Finance',
    iconName: 'Landmark',
    color: '#06b6d4',
    documentCount: 1,
    isSmart: true,
    filterKeywords: ['hdfc', 'bank', 'account', 'statement', 'ifsc', 'salary', 'transaction'],
    createdAt: '2025-02-05T12:00:00Z',
  },
  {
    id: 'col_health',
    userId: 'usr_demo_8829',
    name: 'Insurance & Healthcare',
    description: 'Health insurance policies, policy numbers, claim terms',
    category: 'Insurance',
    iconName: 'HeartPulse',
    color: '#ec4899',
    documentCount: 1,
    isSmart: true,
    filterKeywords: ['insurance', 'policy', 'star health', 'sum insured', 'premium', 'hospital'],
    createdAt: '2025-02-10T16:00:00Z',
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc_passport_01',
    userId: 'usr_demo_8829',
    name: 'Passport_Document.pdf',
    originalName: 'Aditya_Sharma_Passport_2021.pdf',
    mimeType: 'application/pdf',
    size: 2450000,
    category: 'Identity',
    collectionId: 'col_id',
    tags: ['passport', 'gov-id', 'travel', 'identity'],
    fileUrl: '/mock/passport.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80',
    pageCount: 2,
    summary: 'Official Republic of India Passport issued to Aditya Sharma at Regional Passport Office Delhi. Contains passport number, birth details, and validity.',
    extractedEntities: {
      people: ['Aditya Sharma', 'Ramesh Sharma (Father)', 'Sunita Sharma (Mother)'],
      idNumbers: ['Z8924018', 'Aadhaar: 4589 1234 8921'],
      documentNumber: 'Z8924018',
      issueDate: '19 March 2021',
      expiryDate: '18 March 2031',
      organizations: ['Government of India - Ministry of External Affairs', 'Passport Office Delhi'],
      dates: ['19 March 2021', '18 March 2031', '14 August 1998 (DOB)'],
      summaryBulletPoints: [
        'Passport Number: Z8924018',
        'Valid Until: 18 March 2031 (10-year validity)',
        'Place of Issue: Delhi, India',
        'Emigration Check Not Required (ECNR)'
      ]
    },
    ocrStatus: 'completed',
    ocrText: `REPUBLIC OF INDIA / PASSPORT
Type: P | Country Code: IND | Passport No: Z8924018
Surname: SHARMA
Given Names: ADITYA
Nationality: INDIAN | Sex: M | Date of Birth: 14/08/1998
Place of Birth: NEW DELHI, INDIA
Place of Issue: DELHI
Date of Issue: 19/03/2021 | Date of Expiry: 18/03/2031
Father: RAMESH SHARMA | Mother: SUNITA SHARMA
Address: Flat 402, Block B, Green Valley Apartments, Sector 62, Noida, Uttar Pradesh - 201309.
P<INDSHARMA<<ADITYA<<<<<<<<<<<<<<<<<<<<<<<<<
Z8924018<4IND9808148M3103184<<<<<<<<<<<<<<02`,
    status: 'ready',
    processingProgress: 100,
    isFavorite: true,
    isShared: false,
    isTrash: false,
    isDemo: true,
    createdAt: '2025-01-16T11:05:00Z',
    updatedAt: '2025-01-16T11:06:30Z',
    chunks: [
      {
        id: 'chk_pass_1',
        documentId: 'doc_passport_01',
        pageNumber: 1,
        content: `Republic of India Passport No: Z8924018. Holder: Aditya Sharma. DOB: 14 August 1998. Date of Issue: 19 March 2021. Date of Expiry: 18 March 2031. Place of Issue: Delhi. Status: Active.`,
        tokens: 45
      },
      {
        id: 'chk_pass_2',
        documentId: 'doc_passport_01',
        pageNumber: 2,
        content: `Endorsement page: Father Ramesh Sharma, Mother Sunita Sharma. Address: Flat 402, Block B, Green Valley Apartments, Sector 62, Noida, UP - 201309. ECNR eligible.`,
        tokens: 38
      }
    ]
  },
  {
    id: 'doc_aadhaar_02',
    userId: 'usr_demo_8829',
    name: 'Aadhaar_Card.pdf',
    originalName: 'UIDAI_Aadhaar_Aditya_Sharma.pdf',
    mimeType: 'application/pdf',
    size: 1150000,
    category: 'Identity',
    collectionId: 'col_id',
    tags: ['aadhaar', 'uidai', 'identity', 'national-id'],
    fileUrl: '/mock/aadhaar.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&auto=format&fit=crop&q=80',
    pageCount: 1,
    summary: 'Unique Identification Authority of India (UIDAI) e-Aadhaar card issued to Aditya Sharma. Contains 12-digit Aadhaar number, Virtual ID, and registered mobile verification.',
    extractedEntities: {
      people: ['Aditya Sharma', 'S/O Ramesh Sharma'],
      idNumbers: ['4589 1234 8921', 'VID: 9102 3849 1029 4819'],
      documentNumber: '4589 1234 8921',
      issueDate: '10 June 2018',
      organizations: ['Unique Identification Authority of India (UIDAI)'],
      dates: ['14/08/1998 (DOB)', '10/06/2018 (Generated)'],
      summaryBulletPoints: [
        'Aadhaar Number: 4589 1234 8921',
        'Holder: Aditya Sharma',
        'DOB: 14-08-1998 (Gender: Male)',
        'Address: Sector 62, Noida, Gautam Buddha Nagar, UP - 201309'
      ]
    },
    ocrStatus: 'completed',
    ocrText: `GOVERNMENT OF INDIA / UIDAI
Unique Identification Authority of India
Enrollment No: 1029/38492/01928
To: Aditya Sharma, S/O Ramesh Sharma, Sector 62, Noida, Uttar Pradesh - 201309
Your Aadhaar Number: 4589 1234 8921
Mera Aadhaar, Meri Pehchan
VID: 9102 3849 1029 4819
DOB: 14/08/1998 | Male
Digitally signed by DS UNIQUE IDENTIFICATION AUTHORITY OF INDIA 03`,
    status: 'ready',
    processingProgress: 100,
    isFavorite: true,
    isShared: false,
    isTrash: false,
    isDemo: true,
    createdAt: '2025-01-16T11:15:00Z',
    updatedAt: '2025-01-16T11:16:10Z',
    chunks: [
      {
        id: 'chk_aadh_1',
        documentId: 'doc_aadhaar_02',
        pageNumber: 1,
        content: `Government of India UIDAI Aadhaar Card. Aadhaar Number: 4589 1234 8921. Name: Aditya Sharma. DOB: 14/08/1998. Father: Ramesh Sharma. Address: Sector 62, Noida, UP 201309. VID: 9102 3849 1029 4819.`,
        tokens: 52
      }
    ]
  },
  {
    id: 'doc_btech_cert_03',
    userId: 'usr_demo_8829',
    name: 'B.Tech_Degree_Certificate.pdf',
    originalName: 'Delhi_Technological_University_BTech_Degree.pdf',
    mimeType: 'application/pdf',
    size: 3200000,
    category: 'Education',
    collectionId: 'col_edu',
    tags: ['education', 'degree', 'b.tech', 'university', 'computer-science'],
    fileUrl: '/mock/btech_degree.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&auto=format&fit=crop&q=80',
    pageCount: 1,
    summary: 'Bachelor of Technology (B.Tech) Degree in Computer Science and Engineering awarded with First Class with Distinction by Delhi Technological University.',
    extractedEntities: {
      people: ['Aditya Sharma'],
      organizations: ['Delhi Technological University (DTU)', 'Board of Governors DTU'],
      documentNumber: 'DTU/DEG/2021/CS/0491',
      idNumbers: ['Roll No: 2K17/CO/084', 'Reg No: 1701102948'],
      issueDate: '12 July 2021',
      cgpa: '8.84 CGPA',
      percentage: '82.4%',
      dates: ['12 July 2021', 'Academic Session 2017-2021'],
      summaryBulletPoints: [
        'Degree: Bachelor of Technology (Computer Science & Engineering)',
        'Institution: Delhi Technological University (DTU)',
        'Division: First Class with Distinction',
        'Overall CGPA: 8.84 / 10.0 (Equivalent to 82.4%)',
        'Graduation Year: July 2021'
      ]
    },
    ocrStatus: 'completed',
    ocrText: `DELHI TECHNOLOGICAL UNIVERSITY
(Formerly Delhi College of Engineering)
This is to certify that ADITYA SHARMA, Roll No: 2K17/CO/084, Registration No: 1701102948, having fulfilled the requirements of the four-year course of study, is hereby admitted to the Degree of
BACHELOR OF TECHNOLOGY in COMPUTER SCIENCE AND ENGINEERING
with FIRST CLASS WITH DISTINCTION.
Cumulative Grade Point Average (CGPA): 8.84 / 10.00
Given under the seal of the University on this Twelfth day of July, Two Thousand Twenty One.
Vice Chancellor | Registrar | Dean Academic`,
    status: 'ready',
    processingProgress: 100,
    isFavorite: true,
    isShared: false,
    isTrash: false,
    isDemo: true,
    createdAt: '2025-01-15T10:15:00Z',
    updatedAt: '2025-01-15T10:16:40Z',
    chunks: [
      {
        id: 'chk_deg_1',
        documentId: 'doc_btech_cert_03',
        pageNumber: 1,
        content: `Delhi Technological University Bachelor of Technology in Computer Science and Engineering degree conferred upon Aditya Sharma, Roll No: 2K17/CO/084. Awarded First Class with Distinction. Cumulative Grade Point Average (CGPA): 8.84 / 10.00 (Equivalent to 82.4%). Issued on 12 July 2021.`,
        tokens: 60
      }
    ]
  },
  {
    id: 'doc_btech_marksheet_04',
    userId: 'usr_demo_8829',
    name: 'B.Tech_Final_Marksheet.pdf',
    originalName: 'Consolidated_Grade_Card_8th_Sem.pdf',
    mimeType: 'application/pdf',
    size: 2800000,
    category: 'Education',
    collectionId: 'col_edu',
    tags: ['education', 'marksheet', 'grades', 'cgpa', 'semesters'],
    fileUrl: '/mock/btech_marksheet.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&auto=format&fit=crop&q=80',
    pageCount: 2,
    summary: 'Consolidated Grade Sheet covering all 8 semesters of B.Tech CSE at Delhi Technological University with semester-wise SGPA and cumulative CGPA breakdown.',
    extractedEntities: {
      people: ['Aditya Sharma'],
      organizations: ['Delhi Technological University'],
      cgpa: '8.84 (Overall), 3rd Year CGPA: 8.92',
      percentage: '82.4%',
      idNumbers: ['Roll No: 2K17/CO/084', 'Univ Enrolment: 1701102948'],
      dates: ['July 2021', 'Sem 5: Dec 2019', 'Sem 6: Jun 2020', 'Sem 7: Dec 2020', 'Sem 8: May 2021'],
      summaryBulletPoints: [
        'Semester 1 SGPA: 8.40 | Semester 2 SGPA: 8.65',
        'Semester 3 SGPA: 8.70 | Semester 4 SGPA: 8.80',
        '3rd Year (Semester 5 & 6) CGPA: 8.92 (SGPA 8.90 & 8.95)',
        'Final 4th Year (Semester 7 & 8) SGPA: 9.10 & 9.20',
        'Total Credits Earned: 184 / 184 | Final Cumulative CGPA: 8.84'
      ]
    },
    ocrStatus: 'completed',
    ocrText: `DELHI TECHNOLOGICAL UNIVERSITY - CONSOLIDATED GRADE SHEET
Candidate: Aditya Sharma | Roll: 2K17/CO/084 | Program: B.Tech Computer Engineering
Page 1: Semesters 1 to 4 Details
Sem 1: SGPA 8.40, Credits 22
Sem 2: SGPA 8.65, Credits 24
Sem 3: SGPA 8.70, Credits 24
Sem 4: SGPA 8.80, Credits 24
Page 2: Semesters 5 to 8 (3rd & 4th Year) Details
Sem 5 (3rd Year - Autumn): Data Structures, Algorithms, DBMS, Operating Systems - SGPA 8.90
Sem 6 (3rd Year - Spring): Machine Learning, Distributed Systems, Cloud Computing - SGPA 8.95
3rd Year Average SGPA/CGPA: 8.92
Sem 7: SGPA 9.10 | Sem 8 (Final Major Project & Dissertation): SGPA 9.20 (Grade: A+)
FINAL RESULT: Cumulative Grade Point Average (CGPA) = 8.84 / 10.00
Graduation Percentage Equivalent = 82.4% (Formula: CGPA x 10 = Percentage - 6.0 = 82.4% DTU norm).`,
    status: 'ready',
    processingProgress: 100,
    isFavorite: false,
    isShared: false,
    isTrash: false,
    isDemo: true,
    createdAt: '2025-01-15T10:20:00Z',
    updatedAt: '2025-01-15T10:21:15Z',
    chunks: [
      {
        id: 'chk_mark_1',
        documentId: 'doc_btech_marksheet_04',
        pageNumber: 1,
        content: `Consolidated Grade Sheet - Aditya Sharma (Roll: 2K17/CO/084). 1st and 2nd Year Semesters 1 to 4: Sem 1 SGPA 8.40, Sem 2 SGPA 8.65, Sem 3 SGPA 8.70, Sem 4 SGPA 8.80.`,
        tokens: 48
      },
      {
        id: 'chk_mark_2',
        documentId: 'doc_btech_marksheet_04',
        pageNumber: 2,
        content: `3rd Year & 4th Year Grade Performance: Semester 5 SGPA 8.90, Semester 6 SGPA 8.95. 3rd year combined CGPA is 8.92. 4th year: Sem 7 SGPA 9.10, Sem 8 SGPA 9.20. Overall Cumulative CGPA across 8 semesters is 8.84 (Graduation percentage: 82.4%). Total credits earned: 184.`,
        tokens: 75
      }
    ]
  },
  {
    id: 'doc_internship_05',
    userId: 'usr_demo_8829',
    name: 'XYZ_Tech_Internship_Certificate.pdf',
    originalName: 'XYZ_Technologies_Software_Internship_Letter.pdf',
    mimeType: 'application/pdf',
    size: 1450000,
    category: 'Certificates',
    collectionId: 'col_work',
    tags: ['internship', 'certificate', 'software-engineering', 'work-experience', 'react', 'python'],
    fileUrl: '/mock/internship.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&auto=format&fit=crop&q=80',
    pageCount: 1,
    summary: 'Internship completion certificate issued by XYZ Technologies Inc. for a 3-month Software Development Internship from 1st June 2020 to 31st August 2020.',
    extractedEntities: {
      people: ['Aditya Sharma', 'Vikram Malhotra (Engineering VP)', 'Priya Sen (HR Lead)'],
      organizations: ['XYZ Technologies Pvt. Ltd.', 'Cloud Infrastructure Team'],
      documentNumber: 'XYZ/ENG/INT/2020/094',
      issueDate: '31 August 2020',
      dates: ['1 June 2020 - 31 August 2020 (3 Months)', '31 August 2020'],
      summaryBulletPoints: [
        'Role: Software Development Engineering Intern',
        'Organization: XYZ Technologies Pvt. Ltd., Bengaluru',
        'Duration: 3 Months (June 1, 2020 to August 31, 2020)',
        'Key Projects: Microservices optimization in Go/Python, React dashboard, Redis caching',
        'Rating: Exemplary Performance (Pre-Placement Offer recommended)'
      ]
    },
    ocrStatus: 'completed',
    ocrText: `XYZ TECHNOLOGIES PVT. LTD.
Bangalore Tech Park, Outer Ring Road, Bengaluru, Karnataka - 560103
CERTIFICATE OF INTERNSHIP COMPLETION
Ref: XYZ/ENG/INT/2020/094 | Date: 31st August 2020
This certificate is proudly presented to ADITYA SHARMA in recognition of successfully completing a 3-month Software Development Internship with the Cloud Engineering Team from 1st June 2020 to 31st August 2020.
During this tenure, Aditya contributed to:
1. Microservices optimization utilizing Go and Python, reducing API latency by 32%.
2. Built responsive real-time analytics UI in React and TypeScript.
3. Implemented distributed Redis caching layer.
Aditya demonstrated exceptional technical skills, teamwork, and proactive problem-solving. We wish him continued success in all his future endeavors.
Signed: Vikram Malhotra, Vice President - Engineering | Priya Sen, Head of People Operations`,
    status: 'ready',
    processingProgress: 100,
    isFavorite: true,
    isShared: false,
    isTrash: false,
    isDemo: true,
    createdAt: '2025-01-18T14:40:00Z',
    updatedAt: '2025-01-18T14:41:20Z',
    chunks: [
      {
        id: 'chk_intern_1',
        documentId: 'doc_internship_05',
        pageNumber: 1,
        content: `XYZ Technologies Pvt. Ltd. Certificate of Internship Completion. Awarded to Aditya Sharma for completing a 3-month Software Development Internship from 1 June 2020 to 31 August 2020 with the Cloud Engineering Team. Tech stack: Go, Python, React, TypeScript, Redis. Reference: XYZ/ENG/INT/2020/094. Signed by VP Engineering Vikram Malhotra.`,
        tokens: 68
      }
    ]
  },
  {
    id: 'doc_resume_06',
    userId: 'usr_demo_8829',
    name: 'Aditya_Sharma_Senior_Resume.pdf',
    originalName: 'Aditya_Sharma_FullStack_AI_Resume_2025.pdf',
    mimeType: 'application/pdf',
    size: 980000,
    category: 'Employment',
    collectionId: 'col_work',
    tags: ['resume', 'cv', 'profile', 'software-engineer', 'skills', 'experience'],
    fileUrl: '/mock/resume.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&auto=format&fit=crop&q=80',
    pageCount: 2,
    summary: 'Comprehensive 2-page professional resume detailing 4+ years of Full-Stack & AI Engineering experience, DTU B.Tech qualifications, projects, and tech stack.',
    extractedEntities: {
      people: ['Aditya Sharma'],
      organizations: ['Delhi Technological University', 'XYZ Technologies', 'HyperScale AI Labs'],
      cgpa: '8.84 CGPA',
      dates: ['2017 - 2021 (B.Tech)', 'Jun 2020 - Aug 2020 (XYZ Tech)', 'Sep 2021 - Present (Full Time)'],
      summaryBulletPoints: [
        'Title: Senior Full-Stack & AI Engineer',
        'Education: B.Tech Computer Science from Delhi Technological University (CGPA 8.84/10.0)',
        'Core Skills: Next.js, TypeScript, Python, PyTorch, LangChain, PostgreSQL, Vector DBs, Redis, AWS',
        'Past Experience: SDE Intern at XYZ Technologies (June-August 2020), Software Engineer at HyperScale AI',
        'Contact: aditya.sharma@example.com | +91 98765 43210 | GitHub & LinkedIn'
      ]
    },
    ocrStatus: 'completed',
    ocrText: `ADITYA SHARMA
Full-Stack & AI Systems Engineer | Delhi, India
Email: aditya.sharma@example.com | Phone: +91 98765 43210 | GitHub: github.com/adityasharma | LinkedIn: linkedin.com/in/adityasharma-dev

SUMMARY
Results-driven Software Engineer with 4+ years building high-concurrency cloud applications, RAG pipelines, and modern web platforms.

EDUCATION
Delhi Technological University (DTU), New Delhi
Bachelor of Technology in Computer Science & Engineering | 2017 – 2021
Cumulative GPA: 8.84 / 10.0 (First Class with Distinction)

PROFESSIONAL EXPERIENCE
HyperScale AI Labs — Senior Software Engineer | Oct 2021 – Present
- Architected enterprise vector search & retrieval system handling 5M+ daily requests.
- Engineered Next.js + Tailwind web application with sub-100ms response latencies.

XYZ Technologies — Software Development Intern | June 2020 – August 2020
- Built distributed API services in Go and Python; reduced endpoint latency by 32%.
- Created real-time telemetry dashboard in React and TypeScript.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Go, SQL
Frameworks: Next.js, React, Node.js, FastAPI, Tailwind CSS, Express
Databases & AI: PostgreSQL, pgvector, Redis, Pinecone, LangChain, OpenAI APIs, Docker, AWS`,
    status: 'ready',
    processingProgress: 100,
    isFavorite: true,
    isShared: false,
    isTrash: false,
    isDemo: true,
    createdAt: '2025-01-20T08:00:00Z',
    updatedAt: '2025-01-20T08:02:10Z',
    chunks: [
      {
        id: 'chk_res_1',
        documentId: 'doc_resume_06',
        pageNumber: 1,
        content: `Aditya Sharma Resume. Education: Delhi Technological University (DTU), B.Tech Computer Science (2017-2021), CGPA 8.84/10.0. Current Role: Senior Software Engineer at HyperScale AI Labs (2021-Present). Experience: XYZ Technologies Software Development Intern (June 2020 - August 2020).`,
        tokens: 65
      },
      {
        id: 'chk_res_2',
        documentId: 'doc_resume_06',
        pageNumber: 2,
        content: `Skills & Projects: TypeScript, Python, Next.js, React, Tailwind CSS, PostgreSQL, Vector Databases, AWS, Docker. Contact: aditya.sharma@example.com, +91 98765 43210.`,
        tokens: 38
      }
    ]
  },
  {
    id: 'doc_electricity_07',
    userId: 'usr_demo_8829',
    name: 'Electricity_Bill_Oct2025.pdf',
    originalName: 'Tata_Power_DDL_Bill_Oct_2025.pdf',
    mimeType: 'application/pdf',
    size: 750000,
    category: 'Bills',
    collectionId: 'col_bills',
    tags: ['bill', 'electricity', 'utility', 'tata-power', 'expenses', 'october'],
    fileUrl: '/mock/electricity_bill.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80',
    pageCount: 1,
    summary: 'Tata Power Delhi Distribution Limited monthly residential electricity bill for billing cycle October 2025. Total amount payable: ₹1,842.50.',
    extractedEntities: {
      people: ['Aditya Sharma (Consumer)'],
      organizations: ['Tata Power Delhi Distribution Limited (TPDDL)'],
      amounts: ['₹1,842.50 (Total Amount Payable)', '₹1,790.00 (Current Charges)', '₹52.50 (Surcharge/Taxes)'],
      documentNumber: 'CA No: 60019284719',
      idNumbers: ['Meter No: TPDDL-782910', 'Bill No: 109283746'],
      dates: ['Bill Date: 10 Oct 2025', 'Due Date: 24 Oct 2025', 'Units Consumed: 218 kWh'],
      summaryBulletPoints: [
        'Total Amount Payable: ₹1,842.50',
        'Due Date: 24th October 2025',
        'Units Consumed: 218 kWh Units',
        'Consumer Account (CA) Number: 60019284719',
        'Service Address: Flat 402, Green Valley Apartments, Noida'
      ]
    },
    ocrStatus: 'completed',
    ocrText: `TATA POWER DELHI DISTRIBUTION LIMITED
Electricity Invoice / Statement of Electricity Charges
Consumer Account (CA) No: 60019284719 | Bill No: 109283746
Name: Aditya Sharma
Address: Flat 402, Block B, Green Valley Apartments, Sector 62, Noida, UP
Billing Cycle: 01-Oct-2025 to 30-Oct-2025 | Bill Issue Date: 10-Oct-2025
Meter Reading: Previous: 4210 kWh | Current: 4428 kWh | Units Consumed: 218 Units
Energy Charges: ₹1,526.00
Fixed Charges: ₹180.00
Electricity Duty & Regulatory Assets: ₹136.50
Total Current Assessment: ₹1,842.50
TOTAL AMOUNT PAYABLE: ₹1,842.50
Due Date by Cash/Online: 24-Oct-2025
Amount Payable After Due Date (with late fee ₹50): ₹1,892.50`,
    status: 'ready',
    processingProgress: 100,
    isFavorite: false,
    isShared: false,
    isTrash: false,
    isDemo: true,
    createdAt: '2025-02-01T09:10:00Z',
    updatedAt: '2025-02-01T09:11:00Z',
    chunks: [
      {
        id: 'chk_elec_1',
        documentId: 'doc_electricity_07',
        pageNumber: 1,
        content: `Tata Power DDL Electricity Bill for Aditya Sharma (CA No: 60019284719). Total Amount Payable: ₹1,842.50. Due Date: 24-Oct-2025. Consumption: 218 units. Bill Date: 10-Oct-2025.`,
        tokens: 46
      }
    ]
  },
  {
    id: 'doc_bank_salary_08',
    userId: 'usr_demo_8829',
    name: 'HDFC_Bank_Salary_Statement.pdf',
    originalName: 'HDFC_Account_Statement_Nov2025.pdf',
    mimeType: 'application/pdf',
    size: 1350000,
    category: 'Finance',
    collectionId: 'col_finance',
    tags: ['bank', 'statement', 'hdfc', 'salary', 'account', 'financial'],
    fileUrl: '/mock/hdfc_statement.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80',
    pageCount: 2,
    summary: 'HDFC Bank Salary Account Statement showing monthly salary credits, account balance, IFSC code, and branch details.',
    extractedEntities: {
      people: ['Aditya Sharma'],
      organizations: ['HDFC Bank Ltd.', 'HyperScale AI Labs Pvt Ltd (Employer)'],
      accountNumbers: ['A/C No: 50100492817462', 'Customer ID: 89401928'],
      idNumbers: ['IFSC: HDFC0001208', 'MICR: 110240039'],
      amounts: ['Closing Balance: ₹3,42,850.00', 'Monthly Net Salary Credit: ₹1,65,000.00'],
      documentNumber: '50100492817462',
      dates: ['Statement Period: 01-Nov-2025 to 30-Nov-2025'],
      summaryBulletPoints: [
        'Bank: HDFC Bank Ltd, Sector 62 Branch, Noida',
        'Account Number: 50100492817462 (Savings Salary A/C)',
        'IFSC Code: HDFC0001208',
        'Monthly Salary Credit: ₹1,65,000.00 from HyperScale AI Labs',
        'Account Balance: ₹3,42,850.00'
      ]
    },
    ocrStatus: 'completed',
    ocrText: `HDFC BANK LIMITED
Customer Name: MR ADITYA SHARMA
Account Number: 50100492817462
Account Type: Regular Savings / Salary Account
Branch: Sector 62 Noida Branch | IFSC Code: HDFC0001208 | MICR: 110240039
Statement Period: 01/11/2025 to 30/11/2025
Transactions:
30/11/2025: ACH CR - HYPERSCALE AI LABS PVT LTD SALARY NOV 2025 - CR ₹1,65,000.00 | Bal: ₹3,42,850.00
15/11/2025: UPI/Swiggy/Food - DR ₹540.00
10/11/2025: UPI/TataPower/Electricity - DR ₹1,842.50
Total Credits: ₹1,65,000.00 | Total Debits: ₹42,190.00 | Net Closing Balance: ₹3,42,850.00`,
    status: 'ready',
    processingProgress: 100,
    isFavorite: false,
    isShared: false,
    isTrash: false,
    isDemo: true,
    createdAt: '2025-02-05T12:15:00Z',
    updatedAt: '2025-02-05T12:16:30Z',
    chunks: [
      {
        id: 'chk_bank_1',
        documentId: 'doc_bank_salary_08',
        pageNumber: 1,
        content: `HDFC Bank Statement for Aditya Sharma. Account Number: 50100492817462. IFSC Code: HDFC0001208. Branch: Sector 62 Noida. Monthly salary credit of ₹1,65,000 from HyperScale AI Labs. Closing Balance: ₹3,42,850.00.`,
        tokens: 58
      }
    ]
  },
  {
    id: 'doc_insurance_09',
    userId: 'usr_demo_8829',
    name: 'Star_Health_Comprehensive_Insurance.pdf',
    originalName: 'Star_Health_Insurance_Policy_Aditya.pdf',
    mimeType: 'application/pdf',
    size: 2100000,
    category: 'Insurance',
    collectionId: 'col_health',
    tags: ['insurance', 'health', 'star-health', 'policy', 'medical-cover'],
    fileUrl: '/mock/insurance.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&auto=format&fit=crop&q=80',
    pageCount: 3,
    summary: 'Star Health & Allied Insurance Comprehensive Individual Health Policy with ₹15,00,000 Sum Insured, cashless hospitalization coverage, and annual renewal details.',
    extractedEntities: {
      people: ['Aditya Sharma (Insured)', 'Ramesh Sharma (Nominee)'],
      organizations: ['Star Health and Allied Insurance Co. Ltd.'],
      amounts: ['₹15,00,000 (Sum Insured)', '₹14,280.00 (Annual Premium Paid)'],
      documentNumber: 'P/161114/01/2025/008291',
      idNumbers: ['UHID: SH-892019284', 'Policy No: P/161114/01/2025/008291'],
      issueDate: '01 March 2025',
      expiryDate: '28 February 2026',
      dates: ['Policy Start: 01-Mar-2025', 'Policy Expiry: 28-Feb-2026 (Renewal Due)'],
      summaryBulletPoints: [
        'Policy Name: Star Comprehensive Insurance Policy (Individual)',
        'Policy Number: P/161114/01/2025/008291',
        'Sum Insured: ₹15,00,000 (Fifteen Lakhs)',
        'Coverage Validity: 01 March 2025 to 28 February 2026',
        'Cashless Network Hospitals: 14,000+ pan-India'
      ]
    },
    ocrStatus: 'completed',
    ocrText: `STAR HEALTH AND ALLIED INSURANCE COMPANY LIMITED
POLICY SCHEDULE - STAR COMPREHENSIVE INSURANCE POLICY
Policy Number: P/161114/01/2025/008291 | TPA / UHID: SH-892019284
Insured Person: Aditya Sharma | Age: 27 | Gender: Male
Nominee: Ramesh Sharma (Relationship: Father)
Sum Insured: ₹15,00,000/- (Rupees Fifteen Lakhs Only)
Period of Insurance: From 00:00 Hrs of 01/03/2025 to Midnight of 28/02/2026
Gross Premium: ₹12,101.69 | GST (18%): ₹2,178.31 | Total Premium Paid: ₹14,280.00
Coverage Details: In-patient hospitalization, Pre and Post hospitalization 60/90 days, Day care treatments, Air ambulance up to ₹2.5 Lakhs, Health Checkup up to ₹3,500.`,
    status: 'ready',
    processingProgress: 100,
    isFavorite: false,
    isShared: false,
    isTrash: false,
    isDemo: true,
    createdAt: '2025-02-10T16:15:00Z',
    updatedAt: '2025-02-10T16:16:30Z',
    chunks: [
      {
        id: 'chk_ins_1',
        documentId: 'doc_insurance_09',
        pageNumber: 1,
        content: `Star Health Insurance Policy No: P/161114/01/2025/008291. Insured: Aditya Sharma. Sum Insured: ₹15,00,000. Validity: 01 March 2025 to 28 February 2026. Annual Premium: ₹14,280. Cashless cover at 14,000+ hospitals.`,
        tokens: 54
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    userId: 'usr_demo_8829',
    title: 'Document Intelligence Ready',
    message: 'All 7 sample documents have been indexed with OCR and vector embeddings.',
    type: 'success',
    read: false,
    createdAt: '2025-02-10T16:20:00Z'
  },
  {
    id: 'notif_2',
    userId: 'usr_demo_8829',
    title: 'Expiry Intelligence Alert',
    message: 'Your Star Health Insurance policy is due for annual renewal on 28 February 2026.',
    type: 'warning',
    read: false,
    createdAt: '2025-02-12T08:30:00Z'
  },
  {
    id: 'notif_3',
    userId: 'usr_demo_8829',
    title: 'Cross-Document Link Created',
    message: 'Connected Resume ↔ B.Tech Degree ↔ XYZ Tech Internship Certificate.',
    type: 'info',
    read: true,
    createdAt: '2025-02-14T11:00:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_1',
    userId: 'usr_demo_8829',
    action: 'RAG Semantic Query',
    documentName: 'B.Tech_Final_Marksheet.pdf',
    details: 'User queried "What was my CGPA in 3rd year?". Returned 8.92 SGPA / 8.84 Overall with citation.',
    ipAddress: '103.21.124.90 (Encrypted Tunnel)',
    status: 'success',
    timestamp: '2025-02-15T14:22:10Z'
  },
  {
    id: 'log_2',
    userId: 'usr_demo_8829',
    action: 'OCR Extraction',
    documentName: 'Passport_Document.pdf',
    details: 'Extracted 14 entities and created 2 semantic chunks.',
    ipAddress: '103.21.124.90',
    status: 'success',
    timestamp: '2025-01-16T11:06:30Z'
  },
  {
    id: 'log_3',
    userId: 'usr_demo_8829',
    action: 'User Authentication',
    details: 'Secure session established via Token Authorization.',
    ipAddress: '103.21.124.90',
    status: 'success',
    timestamp: '2025-02-15T09:00:00Z'
  }
];
