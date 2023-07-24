import * as yup from 'yup'

export const fileSchema = yup.string().test({
    name: 'base64Image',
    message: 'Invalid image format.',
    test: (value) => {
        if (!value) return false
        const regex = /^data:image\/(jpeg|png|gif);base64,/;
        return regex.test(value);
    },
}).required("Please upload images")

export const validationHandler = async (schema: yup.Schema, data: any) => {
    try {
        await schema.validate(data, { abortEarly: false });
        return "valid";
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            const newErrors: { [key: string]: string } = {};
            err.inner.forEach((error: any) => {
                newErrors[error.path] = error.message;
            });
            console.log(newErrors);
            return newErrors;
        }
    }

}
