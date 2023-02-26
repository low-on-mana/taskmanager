package com.thimblerr.taskmanager.contract;

import com.thimblerr.taskmanager.model.TaskStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class UpdateTaskRequest {

    @NotNull
    private TaskStatus status;

    @NotNull
    private Date eta;

    @NotEmpty
    private String content;
}
