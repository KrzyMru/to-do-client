import Modal from "../Modal";
import { Input } from "../../input";
import { HexColorPicker } from "react-colorful";
import { Button } from "../../button";
import React, { useContext } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { saveList } from "../../../api";
import type { CreateListProps } from "./types";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../contexts/UserContext";
import { IconType } from "../../icon/types";
import { ToastContext } from "../../../contexts/ToastContext";
import { Icon } from "../../icon";
import type { CreateListFormData } from "../../../api/types";

const CreateList = (props: CreateListProps) => {
    const { open, onClose, onSave } = { ...props };
    const { token, setToken } = useContext(UserContext);
    const { openToast } = useContext(ToastContext);
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<CreateListFormData>({
        defaultValues: {
            name: "",
            iconType: IconType.List,
            backgroundColor: "#ffbbbb",
            textColor: "#212121",
            iconColor: "#757575",
        },
    });
    const [loading, setLoading] = React.useState<boolean>(false);
    const { t } = useTranslation();

    const onSubmit: SubmitHandler<CreateListFormData> = async (formData) => {
        try {
            setLoading(true);
            const response = await saveList({ token, setToken, formData });
            onSave(response);
            openToast({
                type: 'success',
                title: t('modals.createList.toast.success.title'),
                text: t('modals.createList.toast.success.text')
            });
            onClose();
        } catch (e: unknown) {
            openToast({
                type: 'error',
                title: t('modals.createList.toast.error.title'),
                text: t('modals.createList.toast.error.text')
            });
        }
        finally {
            setLoading(false);
        }
    }

    const name = watch("name");
    const icon = watch("iconType");
    const backgroundColor = watch("backgroundColor");
    const textColor = watch("textColor");
    const iconColor = watch("iconColor");

    const icons = Object.entries(IconType) as [keyof typeof IconType, IconType][];
    const loadingOrError = loading || errors.name !== undefined;

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex p-1 mb-2 justify-center">
                    <div className="flex items-center w-fit rounded-lg p-2 overflow-auto" style={{ backgroundColor: backgroundColor }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={`size-[32px] lg:size-[48px] shrink-0 ${name.length !== 0 && 'mr-2'} [transition:height_350ms,width_350ms]`}
                            style={{ fill: iconColor }}
                        >
                            <path d={icon}></path>
                        </svg>
                        <p className="text-xl lg:text-3xl line-clamp-1 [transition:font-size_350ms]" style={{ color: textColor }}>{name}</p>
                    </div>
                </div>
                <div className="border-b-1 border-gray-300 dark:border-gray-600 [transition:border-color_350ms]" />
                <div className="flex flex-col pt-4">
                    <div className="flex flex-1 flex-wrap justify-around mb-2">
                        <Controller
                            control={control}
                            name="backgroundColor"
                            render={({ field: { onChange, value } }) => (
                                <div className="flex flex-col p-1">
                                    <HexColorPicker
                                        color={value}
                                        onChange={onChange}
                                        className="!size-[150px] lg:!size-[200px] !self-center [transition:height_350ms,width_350ms]"
                                    />
                                    <p className="text-center text-lg lg:text-2xl text-gray-900 dark:text-white mt-1 [transition:font-size_350ms,color_350ms]">{t('modals.createList.backgroundColorInput.label')}</p>
                                    <p className="text-sm lg:text-lg text-gray-500 dark:text-gray-400 text-center mt-1/2 [transition:font-size_350ms,color_350ms]">{t('modals.createList.backgroundColorInput.text')}</p>
                                </div>
                            )}
                        />
                        <Controller
                            control={control}
                            name="iconColor"
                            render={({ field: { onChange, value } }) => (
                                <div className="flex flex-col p-1 px-3">
                                    <HexColorPicker
                                        color={value}
                                        onChange={onChange}
                                        className="!size-[150px] lg:!size-[200px] !self-center [transition:height_350ms,width_350ms]"
                                    />
                                    <p className="text-center text-lg lg:text-2xl text-gray-900 dark:text-white mt-1 [transition:font-size_350ms,color_350ms]">{t('modals.createList.iconColorInput.label')}</p>
                                    <p className="text-sm lg:text-lg text-gray-500 dark:text-gray-400 text-center mt-1/2 [transition:font-size_350ms,color_350ms]">{t('modals.createList.iconColorInput.text')}</p>
                                </div>
                            )}
                        />
                        <Controller
                            control={control}
                            name="textColor"
                            render={({ field: { onChange, value } }) => (
                                <div className="flex flex-col p-1">
                                    <HexColorPicker
                                        color={value}
                                        onChange={onChange}
                                        className="!size-[150px] lg:!size-[200px] !self-center [transition:height_350ms,width_350ms]"
                                    />
                                    <p className="text-center text-lg lg:text-2xl text-gray-900 dark:text-white mt-1 [transition:font-size_350ms,color_350ms]">{t('modals.createList.textColorInput.label')}</p>
                                    <p className="text-sm lg:text-lg text-gray-500 dark:text-gray-400 text-center mt-1/2 [transition:font-size_350ms,color_350ms]">{t('modals.createList.textColorInput.text')}</p>
                                </div>
                            )}
                        />
                    </div>
                    <Controller
                        control={control}
                        name="iconType"
                        render={({ field: { onChange, value } }) => (
                            <div className="border-1 border-gray-400 bg-gray-300 rounded-lg overflow-hidden mx-1 my-2">
                                <div className="flex gap-[1px] overflow-x-auto">
                                {
                                    icons.map((icon) => (
                                        <button
                                            key={icon[0]}
                                            className={`hover:cursor-pointer focus:outline-none focus-visible:inset-ring-3 focus-visible:inset-ring-sky-600 ${icon[1] === value ? 'bg-sky-200 hover:bg-sky-200' : 'bg-white hover:bg-sky-100'} transition-[background-color] duration-350 hover:duration-100`}
                                            onClick={(e) => { onChange(icon[1]); e.preventDefault(); }}
                                            title={icon[0]}
                                            type="button"
                                        >
                                            <Icon
                                                type={icon[1]}
                                                color="#4B5563"
                                                className="size-[32px] lg:size-[48px] p-1 [transition:height_350ms,width_350ms]"
                                            />
                                        </button>
                                    ))
                                }
                                </div>
                            </div>
                        )}
                    />  
                    <Input
                        id="name"
                        required
                        type="text"
                        label={t('modals.createList.nameInput.label')}
                        helperText={errors.name ? errors.name.message : t('modals.createList.nameInput.helperText')}
                        placeholder={t('modals.createList.nameInput.placeholder')}
                        error={errors.name !== undefined}
                        autoComplete="off"
                        autoFocus
                        {...register("name", { required: t('modals.createList.nameInput.errorRequired'), minLength: { value: 3, message: t('modals.createList.nameInput.errorLength') } })}
                    />
                </div>
                <div className="ml-auto w-fit">
                    <Button
                        title={t('modals.createList.buttonTitle')}
                        type="submit"
                        loading={loading}
                        disabled={loadingOrError}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={`size-[24px] lg:size-[36px] mr-1 ${loadingOrError ? 'fill-indigo-100 dark:fill-gray-600' : 'fill-white'} transition-[width_height_fill] duration-350`}
                        >
                            <path d={"M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3m3-10H5V5h10z"}></path>
                        </svg>
                        <p className={`text-base lg:text-xl font-mono uppercase ${loadingOrError ? 'text-indigo-100 dark:text-gray-600' : 'text-white'} [transition:font-size_350ms,color_350ms]`}>{t('modals.createList.buttonText')}</p>
                    </Button>
                </div>
            </form>
        </Modal>
    );
}



export default CreateList;