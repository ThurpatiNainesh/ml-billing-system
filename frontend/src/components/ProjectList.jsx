// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../services/api';

// export default function ProjectList() {
//   const [list, setList] = useState([]);
//   useEffect(() => { api.get('/').then(r => setList(r.data)); }, []);
//   return (
//     <ul className="list">
//       {/* <h1>Hello!</h1> */}
//       {list?.map(p => (
//         <li key={p._id}>
//           <Link to={`/projects/${p._id}`}>{p.poNumber} – {p.name}</Link>
//         </li>
//       ))}
//     </ul>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Table, Button, DatePicker, Space, Row, Col, Card } from 'antd';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
export default function ProjectList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    applyDateFilter();
  }, [data, dateRange]);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/');
      // map to include key
      const processedData = res.data.map(item => ({ 
        ...item, 
        key: item._id,
        dateDeliveredObj: new Date(item.dateDelivered) // Create date object for easier comparison
      }));
      setData(processedData);
      setFilteredData(processedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const applyDateFilter = () => {
    const [startDate, endDate] = dateRange;
    
    if (!startDate && !endDate) {
      setFilteredData(data);
      return;
    }
    
    const filtered = data.filter(item => {
      const itemDate = item.dateDeliveredObj;
      
      if (startDate && endDate) {
        return itemDate >= startDate.startOf('day').toDate() && 
               itemDate <= endDate.endOf('day').toDate();
      } else if (startDate) {
        return itemDate >= startDate.startOf('day').toDate();
      } else if (endDate) {
        return itemDate <= endDate.endOf('day').toDate();
      }
      
      return true;
    });
    
    setFilteredData(filtered);
  };
  
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };
  
  const clearDateFilter = () => {
    setDateRange([null, null]);
  };

  const columns = [
    {
      title: 'PO Number',
      dataIndex: 'poNumber',
      sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      filters: [
        { text: 'Mockups', value: 'Mockups' },
        { text: 'Proposals', value: 'Proposals' },
        { text: 'Presentations', value: 'Presentations' },
        { text: 'Credentials', value: 'Credentials' },
        { text: 'RFP', value: 'RFP' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      filters: [
        { text: 'Simple', value: 'Simple' },
        { text: 'Medium', value: 'Medium' },
        { text: 'Complex', value: 'Complex' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Client',
      dataIndex: 'clientName',
      render: (text, record) => `${record.clientName} (${record.designation})`,
      sorter: (a, b) => a.clientName.localeCompare(b.clientName),
    },
    {
      title: 'Delivered',
      dataIndex: 'dateDelivered',
      render: date => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.dateDelivered) - new Date(b.dateDelivered),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        { text: 'ongoing', value: 'ongoing' },
        { text: 'completed', value: 'completed' },
        { text: 'pending', value: 'pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions', key: 'actions', render: (_, record) => (
        <Button type="primary" onClick={() => navigate(`/update/${record._id}`)}>
          Update
        </Button>
      )
    }
  ];

  const { RangePicker } = DatePicker;

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col>
            <h4>Date Filter (Delivery Date):</h4>
          </Col>
          <Col flex="auto">
            <Space>
              <RangePicker 
                value={dateRange}
                onChange={handleDateRangeChange}
                format="YYYY-MM-DD"
                allowClear={true}
              />
              <Button onClick={clearDateFilter}>Clear</Button>
            </Space>
          </Col>
          <Col>
            <span>
              {filteredData.length} of {data.length} projects
            </span>
          </Col>
        </Row>
      </Card>
      
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}