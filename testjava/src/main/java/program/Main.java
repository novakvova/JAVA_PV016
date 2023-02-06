package program;

import models.Role;
import org.hibernate.Session;
import org.hibernate.query.Query;
import utils.HibernateSessionUtils;

import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
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
