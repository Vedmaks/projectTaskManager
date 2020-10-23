--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.tok_emp_proj DROP CONSTRAINT IF EXISTS tok_emp_proj_fk_1;
ALTER TABLE IF EXISTS ONLY public.tok_emp_proj DROP CONSTRAINT IF EXISTS tok_emp_proj_fk;
ALTER TABLE IF EXISTS ONLY public.tasks DROP CONSTRAINT IF EXISTS tasks_fk2;
ALTER TABLE IF EXISTS ONLY public.tasks DROP CONSTRAINT IF EXISTS tasks_fk1;
ALTER TABLE IF EXISTS ONLY public.tasks DROP CONSTRAINT IF EXISTS tasks_fk;
ALTER TABLE IF EXISTS ONLY public.tok_emp_proj DROP CONSTRAINT IF EXISTS tok_emp_proj_pk;
ALTER TABLE IF EXISTS ONLY public.tasks DROP CONSTRAINT IF EXISTS tasks_pk;
ALTER TABLE IF EXISTS ONLY public.status DROP CONSTRAINT IF EXISTS status_pk;
ALTER TABLE IF EXISTS ONLY public.projects DROP CONSTRAINT IF EXISTS projects_pk;
ALTER TABLE IF EXISTS ONLY public.employees DROP CONSTRAINT IF EXISTS employees_pk;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.tok_emp_proj;
DROP TABLE IF EXISTS public.tasks;
DROP TABLE IF EXISTS public.status;
DROP TABLE IF EXISTS public.projects;
DROP TABLE IF EXISTS public.employees;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    lastname character varying(50) NOT NULL,
    firstname character varying(50) NOT NULL,
    middlename character varying(50) NOT NULL,
    "position" character varying(50) NOT NULL,
    email character varying(50)
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.employees ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.employees_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    project_name character varying(50) NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.projects ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    status_name character varying(50) NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.status ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    task_name character varying(50) NOT NULL,
    description text NOT NULL,
    notes text,
    status_id integer NOT NULL,
    importance character varying(50),
    employee_id integer,
    planh character varying(50),
    facth character varying(50),
    project_id integer NOT NULL
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tasks ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tok_emp_proj; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tok_emp_proj (
    id integer NOT NULL,
    emp_id integer NOT NULL,
    proj_id integer NOT NULL
);


ALTER TABLE public.tok_emp_proj OWNER TO postgres;

--
-- Name: tok_emp_proj_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tok_emp_proj ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tok_emp_proj_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    email character varying(50) NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, lastname, firstname, middlename, "position", email) FROM stdin;
1	Марченков	Максим	Евгеньевич	Админ	max@gmail.com
2	Андреев	Андрей	Андреевич	Программист	andrei@gmai.com
3	Иванов	Иван	Иванович	Раб	q@q.q
4	Эльдаров	Эльдар	Эльдарович	Рядовой	w@w.w
5	Петров	Петр	Петрович	Уборщик	petr@gmail.com
6	Сидоров	Сидор	Сидорович	Программист	sidor@gmail.com
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, project_name, description) FROM stdin;
1	Новый проект	Тестовый, для проверки test
3	Task Manager	Создание приложения выполняющего функции менеджера задач.\n
4	ntcn	cnh
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (id, status_name) FROM stdin;
1	Бэклог
2	Новая
4	Повторно назначена
5	В работе
6	Согласование
7	Завершена
3	Назначена
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, task_name, description, notes, status_id, importance, employee_id, planh, facth, project_id) FROM stdin;
6	11	1		3	Очень срочно	2			1
3	new1	asdasd		3	Срочно	2			1
10	22	вв		7	Срочно	1	88	88	1
11	Написать спецификацию	Спецификация проекта включающая:\n1.Цель\n2.Описание\n3.Функциональные возможности		7	Очень срочно	1	2	1	3
12	Сделать схему БД	Схема в соответствии со спецификацией		3	Срочно	5			3
13	Создать БД	Использовать схему БД.		3	Срочно	4			3
14	тест	тест	\N	2	\N	\N	\N	\N	3
7	ii	rr		3	Не срочно	2			1
9	www	www		5	Срочно	1	6		1
15	вап	впва	Замечаю\n\nЯ тоже. Эльдар.\n\nПеределай, ничего не работает!!!	4	Очень срочно	4			1
\.


--
-- Data for Name: tok_emp_proj; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tok_emp_proj (id, emp_id, proj_id) FROM stdin;
1	1	1
2	2	1
4	4	3
5	5	3
9	4	4
10	1	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (email, password) FROM stdin;
w@w.w	202cb962ac59075b964b07152d234b70
max@gmail.com	21232f297a57a5a743894a0e4a801fc3
q@q.q	202cb962ac59075b964b07152d234b70
sidor@gmail.com	7815696ecbf1c96e6894b779456d330e
\.


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 9, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 4, true);


--
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_id_seq', 7, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 16, true);


--
-- Name: tok_emp_proj_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tok_emp_proj_id_seq', 10, true);


--
-- Name: employees employees_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pk PRIMARY KEY (id);


--
-- Name: projects projects_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pk PRIMARY KEY (id);


--
-- Name: status status_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pk PRIMARY KEY (id);


--
-- Name: tasks tasks_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pk PRIMARY KEY (id);


--
-- Name: tok_emp_proj tok_emp_proj_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tok_emp_proj
    ADD CONSTRAINT tok_emp_proj_pk PRIMARY KEY (id);


--
-- Name: tasks tasks_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_fk FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: tasks tasks_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_fk1 FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: tasks tasks_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_fk2 FOREIGN KEY (status_id) REFERENCES public.status(id);


--
-- Name: tok_emp_proj tok_emp_proj_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tok_emp_proj
    ADD CONSTRAINT tok_emp_proj_fk FOREIGN KEY (emp_id) REFERENCES public.employees(id);


--
-- Name: tok_emp_proj tok_emp_proj_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tok_emp_proj
    ADD CONSTRAINT tok_emp_proj_fk_1 FOREIGN KEY (proj_id) REFERENCES public.projects(id);


--
-- PostgreSQL database dump complete
--

