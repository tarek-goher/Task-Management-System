-- task_managemen
CREATE TYPE user_role AS ENUM ('manager', 'employee');
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'done');
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    role user_role NOT NULL,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE TASKS(
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    stat task_status NOT NULL,
    description TEXT,
    -- الموظف اللي التاسك بتاعته
    assigned_to INTEGER REFERENCES users(id) ,  
      -- MANGER MAKE A TASK --
    created_by INTEGER REFERENCES users(id) NOT NULL, 
     due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)
