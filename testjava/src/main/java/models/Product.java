package models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="tbl_products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 500, nullable = false)
    private String name;
    private double price;
    @Column(length = 4000)
    private String description;
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date dateCreated;
    private boolean isDeleted;
    @ManyToOne
    @JoinColumn(name="category_id", nullable = false)
    private Category category;
}
