CREATE TABLE categories (
  id integer PRIMARY KEY,
  name text NOT NULL
);

INSERT INTO categories (name) VALUES 
  ('General'),
  ('Technology'),
  ('Random');

CREATE TABLE posts (
  id integer PRIMARY KEY,
  title text NOT NULL,
  contents text NOT NULL,
  timeStamp timestamp DEFAULT CURRENT_TIMESTAMP,
  categoryId integer,
  FOREIGN KEY(categoryId) REFERENCES categories(id)
);

INSERT INTO posts (title, contents, categoryId) VALUES
  ('Test 1', 'Test Data', 1),
  ('Test 2', 'Test Data', 2),
  ('Test 3', 'Test Data', 3);
