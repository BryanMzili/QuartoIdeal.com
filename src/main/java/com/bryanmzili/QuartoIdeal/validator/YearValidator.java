package com.bryanmzili.QuartoIdeal.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.time.LocalDate;

public class YearValidator implements ConstraintValidator<ValidYear, Integer> {

    @Override
    public void initialize(ValidYear constraintAnnotation) {
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        
        int currentYear = LocalDate.now().getYear();
        int maxYear = currentYear + 10; // Definindo o máximo como o ano atual + 10 anos
        
        return value >= currentYear && value <= maxYear;
    }
}
