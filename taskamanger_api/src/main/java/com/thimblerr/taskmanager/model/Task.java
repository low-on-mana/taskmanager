package com.thimblerr.taskmanager.model;

import com.thimblerr.taskmanager.exceptions.InvalidStatusTransition;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private Date eta;

    @Enumerated
    @Builder.Default
    private TaskStatus status = TaskStatus.PENDING;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    public void setStatus(TaskStatus status) {
        if(this.status.canTransitionTo(status)) {
            this.status = status;
        } else {
            throw new InvalidStatusTransition(String.format("Cant transition from %s to %s", this.status, status));
        }
    }
}
