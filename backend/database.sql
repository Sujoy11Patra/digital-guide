CREATE DATABASE IF NOT EXISTS digital_guide_complete;
USE digital_guide_complete;

DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS quiz_results;
DROP TABLE IF EXISTS certifications;
DROP TABLE IF EXISTS job_courses;
DROP TABLE IF EXISTS admission_timelines;
DROP TABLE IF EXISTS exams;
DROP TABLE IF EXISTS scholarships;
DROP TABLE IF EXISTS colleges;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS careers;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('student','admin') DEFAULT 'student',
  class_level ENUM('10','12') DEFAULT '10',
  stream VARCHAR(50),
  preferred_language ENUM('English','Bengali','Hindi') DEFAULT 'English',
  phone VARCHAR(20),
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE careers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  stream VARCHAR(50) NOT NULL,
  interest_area VARCHAR(80) NOT NULL,
  description TEXT,
  subjects TEXT,
  skills TEXT,
  average_salary VARCHAR(100),
  future_scope TEXT
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(100),
  eligibility TEXT,
  duration VARCHAR(100),
  description TEXT,
  career_id INT,
  FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE SET NULL
);

CREATE TABLE colleges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  location VARCHAR(150),
  courses TEXT,
  fees VARCHAR(100),
  website VARCHAR(255)
);

CREATE TABLE scholarships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  eligibility TEXT,
  amount VARCHAR(100),
  deadline DATE,
  link VARCHAR(255)
);

CREATE TABLE exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(100),
  eligibility TEXT,
  exam_month VARCHAR(100),
  website VARCHAR(255),
  description TEXT
);

CREATE TABLE admission_timelines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  class_level ENUM('10','12') DEFAULT '12',
  month_name VARCHAR(50),
  description TEXT
);

CREATE TABLE job_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  category VARCHAR(100),
  duration VARCHAR(100),
  skills TEXT,
  description TEXT
);

CREATE TABLE certifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  provider VARCHAR(120),
  category VARCHAR(100),
  link VARCHAR(255),
  description TEXT
);

CREATE TABLE quiz_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  interest_area VARCHAR(100),
  recommendation TEXT,
  score INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  target_date DATE,
  status ENUM('Pending','In Progress','Completed') DEFAULT 'Pending',
  progress INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  title VARCHAR(180) NOT NULL,
  message TEXT,
  notify_date DATE,
  type VARCHAR(50),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name,email,password,role,class_level,preferred_language)
VALUES ('Admin','admin@gmail.com','$2a$10$nFaQdva4pEerWaqBCbC5Gu1ANXXPTrgTVN1oMEGoyZvvaOW4BZVVK','admin','12','English');
-- Admin password: admin123

INSERT INTO careers (title, stream, interest_area, description, subjects, skills, average_salary, future_scope) VALUES
('Software Engineer','Science','Technology','Designs and builds websites, apps and software systems.','Computer Science, Mathematics, Physics','Java, JavaScript, DSA, DBMS, React, Node.js','3 LPA - 20 LPA','High demand in IT companies, startups and product companies'),
('Doctor','Science','Medical','Treats patients and works in healthcare sector.','Biology, Chemistry, Physics','Medical knowledge, communication, problem solving','6 LPA - 30 LPA','Hospitals, clinics, research and public health'),
('Chartered Accountant','Commerce','Commerce','Works in accounting, auditing, taxation and finance.','Accountancy, Economics, Business Studies','Accounting, taxation, finance, audit','5 LPA - 25 LPA','Corporate finance, audit firms and business consulting'),
('Civil Services Officer','Arts','Government','Works in administration and public service.','Political Science, History, Geography, Economics','General knowledge, writing, decision making','As per govt scale','Government administration and leadership roles'),
('Teacher','Any','Teaching','Teaches and guides students in schools or colleges.','Subject specialization, Education','Communication, patience, subject knowledge','2 LPA - 10 LPA','Schools, colleges, online education platforms');

INSERT INTO courses (title, category, eligibility, duration, description, career_id) VALUES
('B.Tech Computer Science','Degree','Class 12 Science with PCM','4 Years','Engineering degree for software and technology careers.',1),
('BCA','Degree','Class 12 any stream with computer/math preferred','3 Years','Computer application degree for IT career.',1),
('MBBS','Degree','Class 12 Science with PCB and NEET','5.5 Years','Medical degree to become doctor.',2),
('B.Com','Degree','Class 12 Commerce/Any stream','3 Years','Commerce degree for accounts and finance.',3),
('ITI Electrician','ITI','Class 10 Pass','2 Years','Job-oriented technical training.',NULL),
('Diploma Engineering','Diploma','Class 10 Pass','3 Years','Technical diploma after Class 10.',1);

INSERT INTO colleges (name, location, courses, fees, website) VALUES
('Budge Budge Institute of Technology','Kolkata, West Bengal','B.Tech CSE, ECE, ME','Varies','https://www.bbit.edu.in'),
('Jadavpur University','Kolkata, West Bengal','Engineering, Science, Arts','Varies','https://jaduniv.edu.in'),
('University of Calcutta','Kolkata, West Bengal','UG and PG Courses','Varies','https://www.caluniv.ac.in'),
('IIT Kharagpur','Kharagpur, West Bengal','Engineering, Science, Management','Varies','https://www.iitkgp.ac.in');

INSERT INTO scholarships (title, eligibility, amount, deadline, link) VALUES
('National Scholarship Portal','Eligible Indian students','Varies','2026-12-31','https://scholarships.gov.in'),
('Swami Vivekananda Merit Cum Means Scholarship','West Bengal meritorious students','Varies','2026-11-30','https://svmcm.wbhed.gov.in'),
('Oasis Scholarship','Eligible SC/ST/OBC students in West Bengal','Varies','2026-10-31','https://oasis.gov.in');

INSERT INTO exams (name, category, eligibility, exam_month, website, description) VALUES
('JEE Main','Engineering','Class 12 Science with PCM','January / April','https://jeemain.nta.ac.in','Engineering entrance exam for NITs, IIITs and other colleges.'),
('NEET UG','Medical','Class 12 Science with PCB','May','https://neet.nta.nic.in','Medical entrance exam for MBBS, BDS and other medical courses.'),
('WBJEE','Engineering','Class 12 Science with PCM','April','https://wbjeeb.nic.in','West Bengal engineering entrance exam.'),
('CUET','University Admission','Class 12','May / June','https://cuet.nta.nic.in','Common university entrance test for UG admission.'),
('CAT','Management','Graduation','November','https://iimcat.ac.in','Management entrance exam for MBA.');

INSERT INTO admission_timelines (title, class_level, month_name, description) VALUES
('Class 10 Board Exam Preparation','10','January - March','Focus on board exam revision and stream selection research.'),
('Stream Selection','10','April - June','Choose Science, Commerce or Arts based on career goal.'),
('Entrance Exam Registration','12','December - March','Apply for JEE, NEET, CUET, WBJEE or other exams.'),
('College Application','12','May - July','Apply to colleges and prepare documents.'),
('Admission & Counselling','12','July - September','Attend counselling and confirm admission.');

INSERT INTO job_courses (title, category, duration, skills, description) VALUES
('Full Stack Web Development','Technology','6 Months','HTML, CSS, JavaScript, React, Node.js, MySQL','Job-oriented course for web developer roles.'),
('Data Analytics','Technology','4 Months','Excel, SQL, Python, Power BI','Course for data analyst roles.'),
('Digital Marketing','Marketing','3 Months','SEO, Social Media, Ads','Course for marketing jobs.'),
('Tally and GST','Commerce','3 Months','Accounting, GST, Tally','Job-oriented course for commerce students.');

INSERT INTO certifications (title, provider, category, link, description) VALUES
('Java Programming','NPTEL','Programming','https://nptel.ac.in','Useful for Java and software development.'),
('Microsoft Azure Data Fundamentals','Microsoft','Cloud','https://learn.microsoft.com','Basic cloud and data certification.'),
('Google Data Analytics','Google','Data','https://grow.google','Beginner data analytics certification.'),
('Meta Front-End Developer','Meta','Web Development','https://www.coursera.org','Frontend development certification.');

INSERT INTO notifications (title,message,notify_date,type) VALUES
('JEE Main Registration Reminder','Check official website for JEE Main registration and important dates.','2026-12-01','Exam'),
('Scholarship Reminder','Apply for scholarships before the deadline.','2026-10-01','Scholarship');
