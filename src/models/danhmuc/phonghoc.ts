import phongHocService from '@/services/phonghoc';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
	const [danhSach, setDanhSach] = useState<any[]>([]);
	const [record, setRecord] = useState<any>();
	const [visibleForm, setVisibleForm] = useState(false);
	const [edit, setEdit] = useState(false);

	const loadData = () => {
		setDanhSach(phongHocService.getAll());
	};

	const handleAdd = () => {
		setRecord(undefined);
		setEdit(false);
		setVisibleForm(true);
	};

	const handleEdit = (rec: any) => {
		setRecord(rec);
		setEdit(true);
		setVisibleForm(true);
	};

	const handleDelete = (id: string) => {
		const list = phongHocService.getAll();
		const item = list.find((r) => r.id === id);
		if (!item) return;
		if (item.soChoNgoi >= 30) {
			message.error('Chỉ được xóa phòng có dưới 30 chỗ ngồi!');
			return;
		}
		phongHocService.remove(id);
		message.success('Xóa phòng học thành công!');
		loadData();
	};

	const handleSubmit = (values: any) => {
		const list = phongHocService.getAll();

		if (edit && record) {
			const duplicate = list.find(
				(r) => r.id !== record.id && (r.maPhong === values.maPhong || r.tenPhong === values.tenPhong),
			);
			if (duplicate) {
				message.error('Mã phòng hoặc tên phòng đã tồn tại!');
				return false;
			}
			phongHocService.update(record.id, values);
			message.success('Cập nhật phòng học thành công!');
		} else {
			const duplicate = list.find((r) => r.maPhong === values.maPhong || r.tenPhong === values.tenPhong);
			if (duplicate) {
				message.error('Mã phòng hoặc tên phòng đã tồn tại!');
				return false;
			}
			phongHocService.create(values);
			message.success('Thêm phòng học thành công!');
		}

		loadData();
		setVisibleForm(false);
		return true;
	};

	return {
		danhSach,
		record,
		visibleForm,
		edit,
		setVisibleForm,
		loadData,
		handleAdd,
		handleEdit,
		handleDelete,
		handleSubmit,
	};
};
