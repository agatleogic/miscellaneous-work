import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactForm from "../pages/contact";

describe("ContactForm", () => {
  it("should submit the form with the entered values", () => {
    const handleSubmit = jest.fn();

    const { getByLabelText, getByText } = render(
      <ContactForm onSubmit={handleSubmit} />
    );

    const nameInput = getByLabelText("Name:");
    const emailInput = getByLabelText("Email:");
    const messageInput = getByLabelText("Message:");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(messageInput, { target: { value: "Hello World!" } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john.doe@example.com",
      message: "Hello World!",
    });
  });
});
