package com.thimblerr.taskmanager.model;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskAudit {

    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    private Task task;

    @Enumerated
    private TaskStatus status;

    @Column
    private Date eta;

    @Column
    private String content;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    public static TaskAudit buildFromTask(Task task) {
        return builder()
                .task(task)
                .eta(task.getEta())
                .status(task.getStatus())
                .content(task.getContent())
                .build();
    }
}