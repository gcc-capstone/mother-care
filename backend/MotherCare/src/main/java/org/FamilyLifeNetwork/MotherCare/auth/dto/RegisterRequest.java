package org.FamilyLifeNetwork.MotherCare.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    // this will need updated with intake + more fields when database configured

    private String username;
    private String password;
}