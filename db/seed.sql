INSERT INTO department (id, dept_name)
VALUES (001,"executive"),
       (002,"hr"),
       (003,"engineering"),
       (004,"manufacturing"),
       (005,"accounting");
       
INSERT INTO role (id, department_id, title, salary)
VALUES (001, 001, "CEO",1),
       (002, 001, "COO",.9),
       (003, 001, "CFO",.8),
       (004, 002, "HR Lady",.5),
       (005, 002, "HR Dude",.5),
       (006, 003, "Systems Engineer",.7),
       (007, 003, "Process Engineer",.7),
       (008, 004, "Supervisor",.6),
       (009, 004, "Shift Lead",.5),
       (010, 004, "Operator",.4),
       (011, 005, "Accounting Lady",.5),
       (012, 005, "Accounting Man",.5);

INSERT INTO employee (id, role_id, first_name, last_name)
VALUES (001, 001, "Eugene", "Park"),
       (002, 002, "Gene", "Pork"),
       (003, 003, "mom","mother"),
       (004, 004, "Christine","Kim"),
       (005, 005, "Christian","Ronaldo"),
       (006, 006, "Leonel","Messi"),
       (007, 007, "Small","Child"),
       (008, 008, "Jack","Smith"),
       (009, 009, "Angela", "fontera"),
       (010, 010, "Hungry","Hippo"),
       (011, 010, "Angry","Hippo"),
       (012, 010, "Sad","Hippo"),
       (013, 011, "Lady","Accounting"),
       (014, 012, "Lord", "Accounting");
