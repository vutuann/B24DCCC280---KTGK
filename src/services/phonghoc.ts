const KEY = 'phonghoc_list';

const defaultData: PhongHoc.IRecord[] = [
	{
		id: '1',
		maPhong: 'P101',
		tenPhong: 'Phòng 101',
		soChoNgoi: 50,
		loaiPhong: 'LyThuyet',
		nguoiPhuTrach: 'Nguyễn Văn Khoát',
	},
	{
		id: '2',
		maPhong: 'P201',
		tenPhong: 'Phòng thực hành 201',
		soChoNgoi: 25,
		loaiPhong: 'ThucHanh',
		nguoiPhuTrach: 'Đào Xuân Quân',
	},
	{
		id: '3',
		maPhong: 'HT01',
		tenPhong: 'Hội trường lớn',
		soChoNgoi: 200,
		loaiPhong: 'HoiTruong',
		nguoiPhuTrach: 'Nguyễn Việt Hùng',
	},
	{
		id: '4',
		maPhong: 'P102',
		tenPhong: 'Phòng 102',
		soChoNgoi: 20,
		loaiPhong: 'LyThuyet',
		nguoiPhuTrach: 'Hoàng Cao Nguyên',
	},
];

function getAll(): PhongHoc.IRecord[] {
	const raw = localStorage.getItem(KEY);
	if (!raw) {
		localStorage.setItem(KEY, JSON.stringify(defaultData));
		return defaultData;
	}
	return JSON.parse(raw);
}

function saveAll(data: PhongHoc.IRecord[]) {
	localStorage.setItem(KEY, JSON.stringify(data));
}

function create(record: Omit<PhongHoc.IRecord, 'id'>): PhongHoc.IRecord {
	const list = getAll();
	const newItem = { ...record, id: Date.now().toString() };
	list.push(newItem);
	saveAll(list);
	return newItem;
}

function update(id: string, record: Omit<PhongHoc.IRecord, 'id'>): PhongHoc.IRecord {
	const list = getAll();
	const idx = list.findIndex((item) => item.id === id);
	if (idx === -1) throw new Error('Không tìm thấy phòng học');
	list[idx] = { ...list[idx], ...record };
	saveAll(list);
	return list[idx];
}

function remove(id: string) {
	const list = getAll();
	const newList = list.filter((item) => item.id !== id);
	saveAll(newList);
}

const phongHocService = { getAll, create, update, remove };
export default phongHocService;
