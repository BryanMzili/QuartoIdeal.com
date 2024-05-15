package com.bryanmzili.QuartoIdeal.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MonthValidator implements ConstraintValidator<ValidMonth, Integer> {

    @Override
    public void initialize(ValidMonth constraintAnnotation) {
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        return value != null && value >= 1 && value <= 12;
    }
}
