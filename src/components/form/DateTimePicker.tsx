import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { DatePicker as AntDatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import Label from './Label';
import ErrorMessage from './ErrorMessage';

// Định nghĩa props cho FormDatetimePicker
interface FormDatetimePickerProps {
    name: string;
    label?: string;
    value: string; // Chuỗi ISO như "2000-12-12T14:30:00Z"
    required?: boolean;
    error?: string;
    helperText?: string;
    placeholder?: string;
    onChange: (value: string) => void; // Trả về chuỗi ISO
    format?: string;
    showTime?: boolean | { format: string };
    disabledDate?: (current: Dayjs) => boolean;
}

// Hàm format ngày giờ sang chuỗi ISO
export const formatDate = (date: Dayjs | null): string => {
    if (!date) return '';
    return date.format('YYYY-MM-DDTHH:mm:ss.SSSZ'); // Chuỗi ISO: "2000-12-12T14:30:00Z"
};

// Hàm parse chuỗi ISO thành Dayjs object
export const parseDate = (dateStr: string): Dayjs | null => {
    if (!dateStr) return null;
    const date = dayjs(dateStr);
    return date.isValid() ? date : null;
};

export const FormDatetimePicker: React.FC<FormDatetimePickerProps> = ({
    name,
    label,
    value,
    required = false,
    error,
    helperText,
    placeholder = 'Chọn ngày và giờ',
    onChange,
    format = 'HH:mm DD/MM/YYYY',
    showTime = { format: 'HH:mm' },
    disabledDate,
}) => {
    const dateValue = parseDate(value); // Chuyển chuỗi ISO thành Dayjs object

    return (
        <div className={`pb-4 relative ${error ? 'border-red-500' : ''}`}>
            <Label required={required} text={label || ''} name={name} />

            <AntDatePicker
                format={format}
                showTime={showTime}
                value={dateValue}
                placeholder={placeholder}
                onChange={(date: Dayjs | null) => onChange(formatDate(date))}
                className="w-full rounded-md border-gray-300"
                allowClear
                disabledDate={disabledDate}
            />

            {helperText && <div className="text-sm text-gray-500 mt-1">{helperText}</div>}
            {error && <ErrorMessage message={error} />}
        </div>
    );
};

interface FormControllerDatetimePickerProps<T> {
    name: string;
    label?: string;
    control: Control<any>;
    placeholder?: string;
    required?: boolean;
    helperText?: string;
    format?: string;
    showTime?: boolean | { format: string };
    disabledDate?: (current: Dayjs) => boolean;
    error?: string;
}

const FormControllerDatetimePicker = <T extends object>({
    name,
    label,
    control,
    placeholder = 'Chọn ngày và giờ',
    required = false,
    helperText,
    format = 'HH:mm DD/MM/YYYY',
    showTime = { format: 'HH:mm' },
    disabledDate,
    error, // Nhận error từ ngoài
}: FormControllerDatetimePickerProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={required ? { required: 'Trường này là bắt buộc' } : undefined}
            render={({ field }) => (
                <FormDatetimePicker
                    name={name}
                    label={label}
                    value={field.value || ''}
                    placeholder={placeholder}
                    required={required}
                    helperText={helperText}
                    onChange={field.onChange}
                    error={error}
                    format={format}
                    showTime={showTime}
                    disabledDate={disabledDate}
                />
            )}
        />
    );
};

export default FormControllerDatetimePicker;