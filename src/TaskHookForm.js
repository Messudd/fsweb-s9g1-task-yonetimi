import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
    mode: "onChange",
  });

  const onSubmit = (formValue) => {
    console.log("formValue :", formValue);
    submitFn({ ...formValue, id: nanoid(5), status: "yapılacak" });
  };

  useEffect(() => {
    console.log("errors : ", errors);
  }, [errors]);

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
        />
        {!!errors.title?.message && (
          <p className="input-error">{errors.title?.message}</p>
        )}
      </div>
      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        {!!errors.description?.message && (
          <p className="input-error">{errors.description?.message}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                {...register("people", {
                  required: "Lütfen en az bir kişi seçin",
                })}
              />
              {p}
            </label>
          ))}
          {!!errors.people?.message && (
            <p className="input-error">{errors.people?.message}</p>
          )}
        </div>
        <p className="input-error"></p>
      </div>
      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={
            !!errors.title?.message ||
            !!errors.description?.message ||
            errors.people?.length === 0
              ? true
              : false
          }
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
