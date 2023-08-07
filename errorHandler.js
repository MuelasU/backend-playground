// const express = require("express");

module.exports = (err, req, res, next) => {
    let value = err.message;

    if (err.name === "ValidationError") {
        value = {
            email: err.errors['email']?.message ?? '',
            password: err.errors['password']?.message ?? ''
        };
    }

    if (err.code === 11000) {
        value = "Email already in use"
    }

    res.status(400).json({
        error: value
    });
}