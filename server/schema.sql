-- SmartBoard Production Database Schema

-- Enable UUID extension if supported
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Meetings Table
CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, in-progress, completed, cancelled
    status_label VARCHAR(50) DEFAULT 'Scheduled',
    docs_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Meeting Committees (Many-to-Many)
CREATE TABLE IF NOT EXISTS meeting_committees (
    meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
    committee_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (meeting_id, committee_name)
);

-- 3. Strategic Objectives (OKRs)
CREATE TABLE IF NOT EXISTS objectives (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Strategy, ESG, Operations, Finance
    color VARCHAR(50) NOT NULL,
    description TEXT,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    status VARCHAR(50) DEFAULT 'on-track', -- on-track, at-risk, delayed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Key Results (linked to Objectives)
CREATE TABLE IF NOT EXISTS key_results (
    id SERIAL PRIMARY KEY,
    objective_id INTEGER REFERENCES objectives(id) ON DELETE CASCADE,
    label VARCHAR(255) NOT NULL,
    current_value VARCHAR(100),
    target_value VARCHAR(100),
    trend VARCHAR(10) DEFAULT 'up', -- up, down, neutral
    change_pct INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tasks & Action Items
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) DEFAULT 'medium', -- high, medium, low
    due_date VARCHAR(50),
    assignee VARCHAR(100),
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Votes & Ballots
CREATE TABLE IF NOT EXISTS ballots (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    yes_votes INTEGER DEFAULT 0,
    no_votes INTEGER DEFAULT 0,
    abstain_votes INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active', -- active, closed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Documents (Metadata)
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50), -- pdf, xlsx, docx
    version VARCHAR(20) DEFAULT 'v1.0',
    size VARCHAR(50),
    owner VARCHAR(100),
    owner_initials VARCHAR(10),
    folder_name VARCHAR(100),
    file_path TEXT, -- Link to storage (Firebase/S3)
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
