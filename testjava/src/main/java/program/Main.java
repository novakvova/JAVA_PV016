package program;

import models.*;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import utils.HibernateSessionUtils;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        //addQuestion();
        //showQuestions();
        //addTestUserAndRole();
        //createCategory();

        try(Session context = HibernateSessionUtils.getSessionFactory().openSession()) {

        }
    }
    private static void createCategory() {
        try(Session context = HibernateSessionUtils.getSessionFactory().openSession()) {
            Category c = new Category("Ноутбуки","1.jpg",new Date(),false);
            context.save(c);
        }
    }

    private static void addTestUserAndRole() {
        try(Session context = HibernateSessionUtils.getSessionFactory().openSession()) {
            Transaction tx = context.beginTransaction();
            User user = new User("Муха", "Бобер", "bober@gmai.com",
                    "+38097 98 76 786","123456");
            context.save(user);
            var role = context.get(Role.class, 1);
            var ur = new UserRole();
            ur.setUser(user);
            ur.setRole(role);
            context.save(ur);
            tx.commit();
        }
    }
    private static void showQuestions() {
        try(Session context = HibernateSessionUtils.getSessionFactory().openSession()){
            Query query = context.createQuery("FROM Question");
            List<Question> list = query.list();
            for (Question q : list)
                System.out.println(q);
        }
    }
    private static void addQuestion() {
        try(Session context = HibernateSessionUtils.getSessionFactory().openSession()){
            Scanner in = new Scanner(System.in);
            Transaction tx = context.beginTransaction();
            System.out.println("Вкажіть питання:");
            String questionText = in.nextLine();
            Question q = new Question();
            q.setName(questionText);
            context.save(q);
            String action ="";
            do {
                System.out.println("Вкажіть відповідь:");
                String text = in.nextLine();
                System.out.println("1-правильно, 2-невірно");
                boolean isTrue = Byte.parseByte(in.nextLine())==1;
                Answer answer = new Answer();
                answer.setText(text);
                answer.setTrue(isTrue);
                answer.setQuestion(q);
                context.save(answer);
                System.out.println("0. Вихід");
                System.out.println("1. Наступний варіант");
                System.out.println("->_");
                action=in.nextLine();
            }while(!action.equals("0"));
            tx.commit();
        }
    }
    private static void testRole() {
        Session context = HibernateSessionUtils.getSessionFactory().openSession();
//        System.out.println("Вкажіть назву ролі");
//        Scanner in = new Scanner(System.in);
//        String name = in.nextLine();
//        Role role = new Role();
//        role.setName(name);
//        context.save(role);
        Query query = context.createQuery("FROM Role");
        List<Role> list = query.list();
        for (Role role : list) {
            System.out.println("Назва: " + role.getName());
        }
        context.close();
    }
}
