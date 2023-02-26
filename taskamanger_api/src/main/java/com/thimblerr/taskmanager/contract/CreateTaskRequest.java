package com.thimblerr.taskmanager.contract;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class CreateTaskRequest {

    @NotEmpty
    private String title;

    @NotEmpty
    private String content;

    @NotNull
    private Date eta;
}
