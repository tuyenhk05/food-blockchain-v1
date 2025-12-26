export type Stage = {
  name: string;
  icon: 'Sprout' | 'Factory' | 'Truck' | 'Store';
  status: 'completed' | 'current' | 'pending';
  date: string;
  location: string;
  details: Record<string, string>;
  blockchain: {
    verified: boolean;
    txHash: string;
    timestamp: string;
  };
};
export type Batch = {
  batchId: string;
  product: string;
  origin: string;
  harvestDate: string;
  expiryDate: string;
  currentStatus: 'Delivered' | 'In Transit' | 'Processing';
  stages: Stage[];
  conditions: {
    temperature: string;
    humidity: string;
  };
};
export const mockBatches: Batch[] = [{
  batchId: 'DRF-2024-001',
  product: 'Thanh Long Hữu Cơ',
  origin: 'Tỉnh Bình Thuận, Việt Nam',
  harvestDate: '15/01/2024',
  expiryDate: '15/02/2024',
  currentStatus: 'Delivered',
  conditions: {
    temperature: '18-22°C',
    humidity: '85-90%'
  },
  stages: [{
    name: 'Nông Trại',
    icon: 'Sprout',
    status: 'completed',
    date: '15/01/2024',
    location: 'Nông Trại Tân Thành, Bình Thuận',
    details: {
      farmer: 'Nguyễn Văn A',
      certification: 'VietGAP'
    },
    blockchain: {
      verified: true,
      txHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      timestamp: '2024-01-15T08:30:00Z'
    }
  }, {
    name: 'Chế Biến',
    icon: 'Factory',
    status: 'completed',
    date: '16/01/2024',
    location: 'Cơ Sở FreshPack, TP.HCM',
    details: {
      facility: 'FreshPack Ltd',
      qualityCheck: 'Đạt'
    },
    blockchain: {
      verified: true,
      txHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
      timestamp: '2024-01-16T14:20:00Z'
    }
  }, {
    name: 'Vận Chuyển',
    icon: 'Truck',
    status: 'completed',
    date: '17/01/2024',
    location: 'Vận Chuyển Lạnh',
    details: {
      driver: 'Trần Văn B',
      truck: 'VN-79A-12345',
      temperature: '18-22°C',
      humidity: '85-90%'
    },
    blockchain: {
      verified: true,
      txHash: '0x3c4d5e6f7890abcdef1234567890abcdef123456',
      timestamp: '2024-01-17T06:00:00Z'
    }
  }, {
    name: 'Nhà Bán Lẻ',
    icon: 'Store',
    status: 'completed',
    date: '18/01/2024',
    location: 'Siêu Thị FreshMart, Hà Nội',
    details: {
      store: 'FreshMart Quận 1',
      shelfLife: '28 ngày'
    },
    blockchain: {
      verified: true,
      txHash: '0x4d5e6f7890abcdef1234567890abcdef12345678',
      timestamp: '2024-01-18T09:15:00Z'
    }
  }]
}, {
  batchId: 'DRF-2024-002',
  product: 'Thanh Long Hữu Cơ',
  origin: 'Tỉnh Bình Thuận, Việt Nam',
  harvestDate: '20/01/2024',
  expiryDate: '20/02/2024',
  currentStatus: 'In Transit',
  conditions: {
    temperature: '19-21°C',
    humidity: '88%'
  },
  stages: [{
    name: 'Nông Trại',
    icon: 'Sprout',
    status: 'completed',
    date: '20/01/2024',
    location: 'Nông Trại Tân Thành, Bình Thuận',
    details: {
      farmer: 'Nguyễn Văn A',
      certification: 'VietGAP'
    },
    blockchain: {
      verified: true,
      txHash: '0x5e6f7890abcdef1234567890abcdef1234567890',
      timestamp: '2024-01-20T07:00:00Z'
    }
  }, {
    name: 'Chế Biến',
    icon: 'Factory',
    status: 'completed',
    date: '21/01/2024',
    location: 'Cơ Sở FreshPack, TP.HCM',
    details: {
      facility: 'FreshPack Ltd',
      qualityCheck: 'Đạt'
    },
    blockchain: {
      verified: true,
      txHash: '0x6f7890abcdef1234567890abcdef1234567890ab',
      timestamp: '2024-01-21T13:45:00Z'
    }
  }, {
    name: 'Vận Chuyển',
    icon: 'Truck',
    status: 'current',
    date: '22/01/2024',
    location: 'Đang Đến Đà Nẵng',
    details: {
      driver: 'Lê Văn C',
      truck: 'VN-43B-98765',
      temperature: '20°C',
      humidity: '88%'
    },
    blockchain: {
      verified: true,
      txHash: '0x7890abcdef1234567890abcdef1234567890abcd',
      timestamp: '2024-01-22T08:30:00Z'
    }
  }, {
    name: 'Nhà Bán Lẻ',
    icon: 'Store',
    status: 'pending',
    date: 'Dự kiến 23/01/2024',
    location: 'Đang Chờ',
    details: {},
    blockchain: {
      verified: false,
      txHash: '',
      timestamp: ''
    }
  }]
}, {
  batchId: 'DRF-2024-003',
  product: 'Thanh Long Hữu Cơ',
  origin: 'Tỉnh Long An, Việt Nam',
  harvestDate: '22/01/2024',
  expiryDate: '22/02/2024',
  currentStatus: 'Processing',
  conditions: {
    temperature: '25°C',
    humidity: '80%'
  },
  stages: [{
    name: 'Nông Trại',
    icon: 'Sprout',
    status: 'completed',
    date: '22/01/2024',
    location: 'Nông Trại Green Earth, Long An',
    details: {
      farmer: 'Phạm Thị D',
      certification: 'GlobalGAP'
    },
    blockchain: {
      verified: true,
      txHash: '0x890abcdef1234567890abcdef1234567890abcde',
      timestamp: '2024-01-22T09:15:00Z'
    }
  }, {
    name: 'Chế Biến',
    icon: 'Factory',
    status: 'current',
    date: '23/01/2024',
    location: 'Trung Tâm EcoProcess, Long An',
    details: {
      facility: 'EcoProcess',
      qualityCheck: 'Đang Kiểm Tra'
    },
    blockchain: {
      verified: true,
      txHash: '0x90abcdef1234567890abcdef1234567890abcdef',
      timestamp: '2024-01-23T10:00:00Z'
    }
  }, {
    name: 'Vận Chuyển',
    icon: 'Truck',
    status: 'pending',
    date: 'Dự kiến 24/01/2024',
    location: 'Đang Chờ',
    details: {},
    blockchain: {
      verified: false,
      txHash: '',
      timestamp: ''
    }
  }, {
    name: 'Nhà Bán Lẻ',
    icon: 'Store',
    status: 'pending',
    date: 'Dự kiến 25/01/2024',
    location: 'Đang Chờ',
    details: {},
    blockchain: {
      verified: false,
      txHash: '',
      timestamp: ''
    }
  }]
}, {
  batchId: 'DRF-2024-004',
  product: 'Thanh Long Ruột Đỏ',
  origin: 'Tiền Giang, Việt Nam',
  harvestDate: '10/01/2024',
  expiryDate: '10/02/2024',
  currentStatus: 'Delivered',
  conditions: {
    temperature: '20°C',
    humidity: '85%'
  },
  stages: [{
    name: 'Nông Trại',
    icon: 'Sprout',
    status: 'completed',
    date: '10/01/2024',
    location: 'Vườn Trái Cây Mekong',
    details: {
      farmer: 'Võ Văn E',
      certification: 'VietGAP'
    },
    blockchain: {
      verified: true,
      txHash: '0xa1b2c3d4e5f678901234567890abcdef12345678',
      timestamp: '2024-01-10T06:30:00Z'
    }
  }, {
    name: 'Chế Biến',
    icon: 'Factory',
    status: 'completed',
    date: '11/01/2024',
    location: 'Trung Tâm Chế Biến Tiền Giang',
    details: {
      facility: 'Hub #4',
      qualityCheck: 'Đạt'
    },
    blockchain: {
      verified: true,
      txHash: '0xb2c3d4e5f678901234567890abcdef1234567890',
      timestamp: '2024-01-11T14:00:00Z'
    }
  }, {
    name: 'Vận Chuyển',
    icon: 'Truck',
    status: 'completed',
    date: '12/01/2024',
    location: 'Đội Xe Global Logistics',
    details: {
      driver: 'Nguyễn Văn F',
      truck: 'VN-63C-11223',
      temperature: '20°C',
      humidity: '85%'
    },
    blockchain: {
      verified: true,
      txHash: '0xc3d4e5f678901234567890abcdef123456789012',
      timestamp: '2024-01-12T08:00:00Z'
    }
  }, {
    name: 'Nhà Bán Lẻ',
    icon: 'Store',
    status: 'completed',
    date: '13/01/2024',
    location: 'BigC Cần Thơ',
    details: {
      store: 'BigC Cần Thơ',
      shelfLife: '25 ngày'
    },
    blockchain: {
      verified: true,
      txHash: '0xd4e5f678901234567890abcdef12345678901234',
      timestamp: '2024-01-13T10:30:00Z'
    }
  }]
}, {
  batchId: 'DRF-2024-005',
  product: 'Thanh Long Hữu Cơ',
  origin: 'Tỉnh Bình Thuận, Việt Nam',
  harvestDate: '24/01/2024',
  expiryDate: '24/02/2024',
  currentStatus: 'Processing',
  conditions: {
    temperature: '24°C',
    humidity: '82%'
  },
  stages: [{
    name: 'Nông Trại',
    icon: 'Sprout',
    status: 'completed',
    date: '24/01/2024',
    location: 'Nông Trại Sunny Side',
    details: {
      farmer: 'Hoàng Văn G',
      certification: 'Organic EU'
    },
    blockchain: {
      verified: true,
      txHash: '0xe5f678901234567890abcdef1234567890123456',
      timestamp: '2024-01-24T07:45:00Z'
    }
  }, {
    name: 'Chế Biến',
    icon: 'Factory',
    status: 'current',
    date: '25/01/2024',
    location: 'Nhà Đóng Gói Premium',
    details: {
      facility: 'Premium Pack',
      qualityCheck: 'Đang Chờ'
    },
    blockchain: {
      verified: true,
      txHash: '0xf678901234567890abcdef123456789012345678',
      timestamp: '2024-01-25T09:00:00Z'
    }
  }, {
    name: 'Vận Chuyển',
    icon: 'Truck',
    status: 'pending',
    date: 'Dự kiến 26/01/2024',
    location: 'Đang Chờ',
    details: {},
    blockchain: {
      verified: false,
      txHash: '',
      timestamp: ''
    }
  }, {
    name: 'Nhà Bán Lẻ',
    icon: 'Store',
    status: 'pending',
    date: 'Dự kiến 27/01/2024',
    location: 'Đang Chờ',
    details: {},
    blockchain: {
      verified: false,
      txHash: '',
      timestamp: ''
    }
  }]
}];