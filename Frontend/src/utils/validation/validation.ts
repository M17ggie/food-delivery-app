import * as yup from 'yup'

export const fileSchema = yup.mixed().required('Please upload the image').test('file-size', 'File size must be less than 1MB', (value: any) => value && value.size <= 1024 * 1024).test('file-type', 'Only JPEG image is allowed', (value: any) => value && value.type === 'image/jpeg')
