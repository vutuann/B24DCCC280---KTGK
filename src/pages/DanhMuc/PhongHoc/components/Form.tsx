import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useModel } from 'umi';

const NGUOI_PHU_TRACH = [
	'Nguyễn Văn Khoát',
	'Đào Xuân Quân',
	'Nguyễn Việt Hùng',
	'Hoàng Cao Nguyên',
	'Nguyễn Trần Mạnh Quyết',
];

const LOAI_PHONG = [
	{ value: 'LyThuyet', label: 'Lý thuyết' },
	{ value: 'ThucHanh', label: 'Thực hành' },
	{ value: 'HoiTruong', label: 'Hội trường' },
];

const FormPhongHoc = () => {
	const [form] = Form.useForm();
	const { visibleForm, setVisibleForm, edit, record, handleSubmit } = useModel('danhmuc.phonghoc');

	const onSave = async () => {
		try {
			const values = await form.validateFields();
			handleSubmit(values);
		} catch (_) {
			return;
		}
	};

	return (
		<Modal
			title={edit ? 'Chỉnh sửa phòng học' : 'Thêm phòng học'}
			visible={visibleForm}
			onCancel={() => setVisibleForm(false)}
			footer={null}
			destroyOnClose
		>
			<Form form={form} key={edit ? record?.id : 'new'} layout='vertical' initialValues={edit && record ? record : {}}>
				<Form.Item
					name='maPhong'
					label='Mã phòng'
					rules={[
						{ required: true, message: 'Bắt buộc' },
						{ max: 10, message: 'Tối đa 10 ký tự' },
					]}
				>
					<Input placeholder='Nhập mã phòng' maxLength={10} />
				</Form.Item>

				<Form.Item
					name='tenPhong'
					label='Tên phòng'
					rules={[
						{ required: true, message: 'Bắt buộc' },
						{ max: 50, message: 'Tối đa 50 ký tự' },
					]}
				>
					<Input placeholder='Nhập tên phòng' maxLength={50} />
				</Form.Item>

				<Form.Item name='nguoiPhuTrach' label='Người phụ trách' rules={[{ required: true, message: 'Bắt buộc' }]}>
					<Select placeholder='Chọn người phụ trách'>
						{NGUOI_PHU_TRACH.map((name) => (
							<Select.Option key={name} value={name}>
								{name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					name='soChoNgoi'
					label='Số chỗ ngồi'
					rules={[
						{ required: true, message: 'Bắt buộc' },
						{ type: 'number', min: 10, message: 'Tối thiểu 10 chỗ' },
						{ type: 'number', max: 200, message: 'Tối đa 200 chỗ' },
					]}
				>
					<InputNumber min={10} max={200} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item name='loaiPhong' label='Loại phòng' rules={[{ required: true, message: 'Bắt buộc' }]}>
					<Select placeholder='Chọn loại phòng'>
						{LOAI_PHONG.map((item) => (
							<Select.Option key={item.value} value={item.value}>
								{item.label}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
					<Button onClick={() => setVisibleForm(false)}>Hủy</Button>
					<Button type='primary' onClick={onSave}>
						{edit ? 'Lưu lại' : 'Thêm mới'}
					</Button>
				</div>
			</Form>
		</Modal>
	);
};

export default FormPhongHoc;
