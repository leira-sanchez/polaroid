"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  subject: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
};

const submitContactForm = async (values: ContactFormValues) => {
  const { email, message, name, subject } = values;
  const response = await fetch("/api/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, message, name, subject }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return data;
};

const ContactForm = ({ open }: { open: boolean }) => {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formValues.name) newErrors.name = "Name is required";
    if (!formValues.email) newErrors.email = "Email is required";
    if (!formValues.subject) newErrors.subject = "Subject is required";
    if (!formValues.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      setSubmissionError(null);
      await submitContactForm(formValues);
      setSubmissionSuccess("Message sent successfully!");
      setFormValues({
        name: "",
        email: "",
        message: "",
        subject: "",
      });
    } catch (error: any) {
      setSubmissionError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormValues({
      name: "",
      email: "",
      message: "",
      subject: "",
    });
    setErrors({});
    setSubmissionError(null);
    setSubmissionSuccess(null);
    setLoading(false);
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Get in Touch</DialogTitle>
        <DialogDescription>Let&apos;s talk</DialogDescription>
      </DialogHeader>
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <p>Sending message...</p>
        </div>
      ) : submissionSuccess ? (
        <div className="flex justify-center items-center py-16">
          <p className="text-green-500">{submissionSuccess}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formValues.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter your subject"
              type="text"
              value={formValues.subject}
              onChange={handleChange}
            />
            {errors.subject && <p className="text-red-500">{errors.subject}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your message"
              className="min-h-[100px]"
              value={formValues.message}
              onChange={handleChange}
            />
            {errors.message && <p className="text-red-500">{errors.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={resetForm}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
          {submissionError && <p className="text-red-500">{submissionError}</p>}
        </form>
      )}
    </DialogContent>
  );
};

export default ContactForm;
