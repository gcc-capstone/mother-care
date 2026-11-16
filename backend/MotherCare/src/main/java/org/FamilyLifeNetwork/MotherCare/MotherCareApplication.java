package org.FamilyLifeNetwork.MotherCare;

import com.autoauth.annotation.EnableAutoAuth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableAutoAuth
@SpringBootApplication
public class MotherCareApplication {

	public static void main(String[] args) {
		SpringApplication.run(MotherCareApplication.class, args);
	}

}
