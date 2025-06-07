import Modal from "../Modal";
import { Input } from "../../input";
import { Button } from "../../button";
import React, { useContext } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { saveTask } from "../../../api";
import type { CreateTaskProps } from "./types";
import { UserContext } from "../../../contexts";
import { useTranslation } from "react-i18next";
import { ToastContext } from "../../../contexts/ToastContext";
import type { CreateTaskFormData } from "../../../api/types";
import dayjs from "dayjs";

const CreateTask = (props: CreateTaskProps) => {
    const { open, onClose, onSave, listId } = { ...props };
    const { token, setToken } = useContext(UserContext);
    const { openToast } = useContext(ToastContext);
    const { register, handleSubmit, formState: { errors } } = useForm<CreateTaskFormData>({
        defaultValues: {
            listId: listId,
            name: "",
            description: "",
            due: dayjs().format('YYYY-MM-DDTHH:mm'),    // datetime-local needs this format
        },
    });
    const [loading, setLoading] = React.useState<boolean>(false);
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<CreateTaskFormData> = async (formData) => {
        try {
            setLoading(true);
            const response = await saveTask({ token, setToken, formData: 
                {...formData, 
                    created: dayjs().format('MM/DD/YYYY HH:mm:ss Z'), // Created when sending a request
                    due: dayjs(formData.due).format('MM/DD/YYYY HH:mm:ss Z')  // Needed to keep timezone info
                }
            });
            onSave(response);
            openToast({
                type: 'success',
                title: t('modals.createTask.toast.success.title'),
                text: t('modals.createTask.toast.success.text')
            });
            onClose();
        } catch (e: unknown) {
            openToast({
                type: 'error',
                title: t('modals.createTask.toast.error.title'),
                text: t('modals.createTask.toast.error.text')
            });
        }
        finally {
            setLoading(false);
        }
    }

    const loadingOrError = loading || errors.name !== undefined;

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-1 mb-1">
                    <p className="text-center text-gray-900 dark:text-white text-xl lg:text-3xl line-clamp-1 [transition:font-size_350ms,color_350ms]">{t('modals.createTask.header')}</p>
                </div>
                <div className="border-b-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]" />
                <div className="pt-4">
                    <Input
                        id="name"
                        required
                        type="text"
                        label={t('modals.createTask.nameInput.label')}
                        helperText={errors.name ? errors.name.message : t('modals.createTask.nameInput.helperText')}
                        placeholder={t('modals.createTask.nameInput.placeholder')}
                        error={errors.name !== undefined}
                        autoComplete="off"
                        autoFocus
                        {...register("name", { required: t('modals.createTask.nameInput.errorRequired'), minLength: { value: 3, message: t('modals.createTask.nameInput.errorLength') } })}
                    />
                    <Input
                        id="description"
                        type="text"
                        textarea={true}
                        label={t('modals.createTask.descriptionInput.label')}
                        helperText={t('modals.createTask.descriptionInput.helperText')}
                        placeholder={t('modals.createTask.descriptionInput.placeholder')}
                        autoComplete="off"
                        {...register("description")}
                    />
                    <Input
                        id="datetime"
                        type="datetime-local"
                        label={t('modals.createTask.dateTimeInput.label')}
                        helperText={t('modals.createTask.dateTimeInput.helperText')}
                        autoComplete="off"
                        {...register("due")}
                    />
                </div>
                <div className="ml-auto w-fit">
                    <Button
                        title={t('modals.createTask.buttonTitle')}
                        type="submit"
                        loading={loading}
                        disabled={loadingOrError}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={`size-[24px] lg:size-[36px] mr-1 ${loadingOrError ? 'fill-indigo-100 dark:fill-gray-600' : 'fill-white'} transition-[fill_height_width] duration-350`}
                        >
                            <path d={"M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3m3-10H5V5h10z"}></path>
                        </svg>
                        <p className={`text-base lg:text-xl font-mono uppercase ${loadingOrError ? 'text-indigo-100 dark:text-gray-600' : 'text-white'} [transition:font-size_350ms,color_350ms]`}>{t('modals.createTask.buttonText')}</p>
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateTask;