INSERT INTO department (id, dept_name)
VALUES (001,"executive"),
       (002,"hr"),
       (003,"engineering"),
       (004,"manufacturing"),
       (005,"accounting");
       
INSERT INTO role (id, department_id, title, salary)
VALUES (001, 001, "CEO",100000),
       (002, 001, "COO",90000),
       (003, 001, "CFO",80000),
       (004, 002, "HR Lady",50000),
       (005, 002, "HR Dude",50000),
       (006, 003, "Systems Engineer",70000),
       (007, 003, "Process Engineer",70000),
       (008, 004, "Supervisor",60000),
       (009, 004, "Shift Lead",50000),
       (010, 004, "Operator",40000),
       (011, 005, "Accounting Lady",50000),
       (012, 005, "Accounting Man",50000);

INSERT INTO employee (id, role_id, first_name, last_name, manager_id, manager_name)
VALUES (001, 001, "Eugene", "Park", 001, "Eugene"),
       (002, 002, "Gene", "Pork", 001, "Eugene"),
       (003, 003, "mom","mother", 001, "Gene"),
       (004, 004, "Christine","Kim", 001, "mom"),
       (005, 005, "Christian","Ronaldo", 001, "mom"),
       (006, 006, "Leonel","Messi", 001, "Gene"),
       (007, 007, "Small","Child", 001, "Gene"),
       (008, 008, "Jack","Smith", 007, "Small Child"),
       (009, 009, "Angela", "fontera", 008, "Jack"),
       (010, 010, "Hungry","Hippo", 009, "Angela"),
       (011, 010, "Angry","Hippo", 009, "Angela"),
       (012, 010, "Sad","Hippo", 009, "Angela"),
       (013, 011, "Lady","Accounting", 001, "mom"),
       (014, 012, "Lord", "Accounting", 001, "mom");
