import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Select, Space, Table, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import FormPhongHoc from './components/Form';

const LOAI_PHONG_LABEL: Record<string, string> = {
	LyThuyet: 'Lý thuyết',
	ThucHanh: 'Thực hành',
	HoiTruong: 'Hội trường',
};

const LOAI_PHONG_COLOR: Record<string, string> = {
	LyThuyet: 'blue',
	ThucHanh: 'green',
	HoiTruong: 'purple',
};

const NGUOI_PHU_TRACH = [
	'Nguyễn Văn Khoát',
	'Đào Xuân Quân',
	'Nguyễn Việt Hùng',
	'Hoàng Cao Nguyên',
	'Nguyễn Trần Mạnh Quyết',
];

const PhongHocPage = () => {
	const { danhSach, loadData, handleAdd, handleEdit, handleDelete } = useModel('danhmuc.phonghoc');

	const [search, setSearch] = useState('');
	const [filterLoai, setFilterLoai] = useState<string | undefined>();
	const [filterNguoi, setFilterNguoi] = useState<string | undefined>();

	useEffect(() => {
		loadData();
	}, []);

	const filtered = danhSach
		.filter((item) => {
			const keyword = search.toLowerCase();
			const matchSearch =
				!keyword || item.maPhong.toLowerCase().includes(keyword) || item.tenPhong.toLowerCase().includes(keyword);
			const matchLoai = !filterLoai || item.loaiPhong === filterLoai;
			const matchNguoi = !filterNguoi || item.nguoiPhuTrach === filterNguoi;
			return matchSearch && matchLoai && matchNguoi;
		})
		.sort((a, b) => a.soChoNgoi - b.soChoNgoi);

	const columns = [
		{
			title: 'Mã phòng',
			dataIndex: 'maPhong',
			width: 100,
		},
		{
			title: 'Tên phòng',
			dataIndex: 'tenPhong',
		},
		{
			title: 'Số chỗ ngồi',
			dataIndex: 'soChoNgoi',
			width: 120,
			align: 'center' as const,
		},
		{
			title: 'Loại phòng',
			dataIndex: 'loaiPhong',
			width: 130,
			render: (_: any, row: PhongHoc.IRecord) => (
				<Tag color={LOAI_PHONG_COLOR[row.loaiPhong]}>{LOAI_PHONG_LABEL[row.loaiPhong]}</Tag>
			),
		},
		{
			title: 'Người phụ trách',
			dataIndex: 'nguoiPhuTrach',
			width: 160,
		},
		{
			title: 'Thao tác',
			width: 100,
			align: 'center' as const,
			render: (_: any, row: PhongHoc.IRecord) => (
				<>
					<Tooltip title='Chỉnh sửa'>
						<Button type='link' icon={<EditOutlined />} onClick={() => handleEdit(row)} />
					</Tooltip>
					<Tooltip title={row.soChoNgoi >= 30 ? 'Không thể xóa phòng ≥ 30 chỗ' : 'Xóa'}>
						<Popconfirm
							title='Bạn có chắc muốn xóa phòng học này?'
							onConfirm={() => handleDelete(row.id)}
							disabled={row.soChoNgoi >= 30}
						>
							<Button danger type='link' icon={<DeleteOutlined />} disabled={row.soChoNgoi >= 30} />
						</Popconfirm>
					</Tooltip>
				</>
			),
		},
	];

	return (
		<div style={{ padding: 24 }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
				<Space wrap>
					<Input.Search
						placeholder='Tìm mã phòng, tên phòng...'
						allowClear
						style={{ width: 260 }}
						onSearch={(val) => setSearch(val)}
						onChange={(e) => {
							if (!e.target.value) setSearch('');
						}}
					/>
					<Select allowClear placeholder='Lọc loại phòng' style={{ width: 160 }} onChange={(val) => setFilterLoai(val)}>
						<Select.Option value='LyThuyet'>Lý thuyết</Select.Option>
						<Select.Option value='ThucHanh'>Thực hành</Select.Option>
						<Select.Option value='HoiTruong'>Hội trường</Select.Option>
					</Select>
					<Select
						allowClear
						placeholder='Lọc người phụ trách'
						style={{ width: 180 }}
						onChange={(val) => setFilterNguoi(val)}
					>
						{NGUOI_PHU_TRACH.map((name) => (
							<Select.Option key={name} value={name}>
								{name}
							</Select.Option>
						))}
					</Select>
				</Space>
				<Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
					Thêm phòng học
				</Button>
			</div>

			<Table rowKey='id' columns={columns} dataSource={filtered} pagination={{ pageSize: 10 }} bordered />

			<FormPhongHoc />
		</div>
	);
};

export default PhongHocPage;
