INSERT INTO department (name)
VALUES
    ('Web Development'),
    ('Fashion & Merchandising'),
    ('Theatre Arts & Film'),
    ('Math & Science');

INSERT INTO role (title, department_id, salary)
VALUES
    ('Full Stack Developer', '001', '85000'), -- 1
    ('Software Engineer', '001', '185000'), -- 2
    ('Fashion Designer', '120000', '002'), -- 3
    ('Merchandising Manager', '002', '75000'), -- 4
    ('Film Director', '003','285000'), -- 5
    ('Production Manager', '003', '69000'), -- 6
    ('Data Scientist', '004', '115000'), -- 7
    ('Biomedical Research Scientist', '004', '117000'); -- 8

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
    ('Eddie', 'Murphy', 5, 5);
