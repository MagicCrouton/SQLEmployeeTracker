INSERT INTO department (id, dept_name)
VALUES (001,"executive"),
       (002,"hr"),
       (003,"engineering"),
       (004,"manufacturing"),
       (005,"accounting"),
       
INSERT INTO job (id, department_id, title)
VALUES (001, 001, "CEO"),
       (002, 001, "COO"),
       (003, 001, "CFO"),
       (001, 002, "HR Lady"),
       (002, 002, "HR Dude"),
       (001, 003, "Systems Engineer"),
       (002, 003, "Process Engineer")
       (001, 004, "Supervisor"),
       (002, 004, "Shift Lead"),
       (003, 004, "Operator"),
       (001, 005, "Accounting Lady"),
       (002, 005, "Accounting Man");

INSERT INTO employee (job_id, department_id, first_name, last_name)
VALUES (001, 001, "Eugene", "Park"),
       (002, 001, "Gene", "Pork"),
       (003, 001, "mom","mother"),
       (001, 002, "Christine","Kim"),
       (002, 002, "Christian","Ronaldo"),
       (001, 003, "Leonel","Messi"),
       (002, 003, "Small","Child")
       (001, 004, "Jack","Smith"),
       (002, 004, "Angela", "fontera"),
       (003, 004, "Hungry","Hippo"),
       (003, 004, "Angry","Hippo"),
       (003, 004, "Sad","Hippo"),
       (001, 005, "Lady","Accounting"),
       (002, 005, "Lord", "Accounting");