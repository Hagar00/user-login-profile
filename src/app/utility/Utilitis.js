export const trimValidation = (value, name) => {
    return value?.trim() !== "" ? undefined : `${name} can not be empty `;
  };

  export const validatePassword = (value) => {
    if (!/(?=.*[A-Z])/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
  
    if (!/(?=.*\d)/.test(value)) {
      return "Password must contain at least one digit";
    }
  
    if (!/(?=.*[\W_])/.test(value)) {
      return "Password must contain at least one special character";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
  
    return true;
  };

  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };