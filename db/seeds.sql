INSERT INTO department (name)
VALUES
    ('Web Development'),
    ('Fashion & Merchandising'),
    ('Theatre Arts & Film'),
    ('Math & Science');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Full Stack Developer', '85000', '001'), -- 1
    ('Software Engineer', '185000', '001'), -- 2
    ('Fashion Designer', '120000', '002'), -- 3
    ('Merchandising Manager', '75000', '002'), -- 4
    ('Film Director', '285000', '003'), -- 5
    ('Production Manager', '69000', '003'), -- 6
    ('Data Scientist', '115000', '004'), -- 7
    ('Biomedical Research Scientist', '117000', '004'); -- 8

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Regina', 'George', 6, 2),
    ('Snoop', 'Dogg', 8, null),
    ('Beyonce', 'Knowles-Carter', 5, 1),
    ('Aubrey', 'Graham', 7, null),
    ('Nipsey', 'Hussle', 3, 3),
    ('Tupac', 'Shakur', 2, 4),
    ('Whitney', 'Houston', 1, null),
    ('Jimmy', 'Dixon', 4, null),
    ('Ziggy', 'Mack', 1, 6),
    ('Eddie', 'Murphy', 5, 5),
