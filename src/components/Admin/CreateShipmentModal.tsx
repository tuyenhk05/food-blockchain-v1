import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Sprout, Factory, Truck, Store } from 'lucide-react';
import { Batch, Stage } from '../data/mockData';
interface CreateShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newBatch: Batch) => void;
}
const STEPS = [{
  id: 1,
  title: 'Thông tin cơ bản'
}, {
  id: 2,
  title: 'Chi tiết giai đoạn'
}, {
  id: 3,
  title: 'Xem lại & Xác nhận'
}];
const INITIAL_STAGES: Stage[] = [{
  name: 'Nông Trại',
  icon: 'Sprout',
  status: 'completed',
  date: '',
  location: '',
  details: {
    farmer: '',
    certification: ''
  },
  blockchain: {
    verified: false,
    txHash: '',
    timestamp: ''
  }
}, {
  name: 'Chế Biến',
  icon: 'Factory',
  status: 'pending',
  date: '',
  location: '',
  details: {
    facility: '',
    qualityCheck: ''
  },
  blockchain: {
    verified: false,
    txHash: '',
    timestamp: ''
  }
}, {
  name: 'Vận Chuyển',
  icon: 'Truck',
  status: 'pending',
  date: '',
  location: '',
  details: {
    driver: '',
    truck: ''
  },
  blockchain: {
    verified: false,
    txHash: '',
    timestamp: ''
  }
}, {
  name: 'Nhà Bán Lẻ',
  icon: 'Store',
  status: 'pending',
  date: '',
  location: '',
  details: {
    store: '',
    shelfLife: ''
  },
  blockchain: {
    verified: false,
    txHash: '',
    timestamp: ''
  }
}];
export function CreateShipmentModal({
  isOpen,
  onClose,
  onSuccess
}: CreateShipmentModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Batch>>({
    batchId: `DRF-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    product: '',
    origin: '',
    harvestDate: '',
    expiryDate: '',
    currentStatus: 'Processing',
    conditions: {
      temperature: '',
      humidity: ''
    },
    stages: JSON.parse(JSON.stringify(INITIAL_STAGES)) // Deep copy
  });
  if (!isOpen) return null;
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleConditionChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: {
        ...prev.conditions!,
        [field]: value
      }
    }));
  };
  const handleStageChange = (index: number, field: string, value: string) => {
    const newStages = [...(formData.stages || [])];
    newStages[index] = {
      ...newStages[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      stages: newStages
    }));
  };
  const handleStageDetailChange = (index: number, key: string, value: string) => {
    const newStages = [...(formData.stages || [])];
    newStages[index].details = {
      ...newStages[index].details,
      [key]: value
    };
    setFormData(prev => ({
      ...prev,
      stages: newStages
    }));
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    // Add mock blockchain data for completed stages
    const finalStages = formData.stages?.map(stage => {
      if (stage.status === 'completed') {
        return {
          ...stage,
          blockchain: {
            verified: true,
            txHash: '0x' + Math.random().toString(16).substr(2, 40),
            timestamp: new Date().toISOString()
          }
        };
      }
      return stage;
    });
    const newBatch = {
      ...formData,
      stages: finalStages
    } as Batch;
    onSuccess(newBatch);
    setIsSubmitting(false);
    onClose();
    // Reset form
    setStep(1);
    setFormData({
      batchId: `DRF-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      product: '',
      origin: '',
      harvestDate: '',
      expiryDate: '',
      currentStatus: 'Processing',
      conditions: {
        temperature: '',
        humidity: ''
      },
      stages: JSON.parse(JSON.stringify(INITIAL_STAGES))
    });
  };
  const renderStep1 = () => <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mã Lô Hàng
          </label>
          <input type="text" value={formData.batchId} disabled className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 font-mono" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sản Phẩm <span className="text-red-500">*</span>
          </label>
          <input type="text" value={formData.product} onChange={e => handleInputChange('product', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="VD: Thanh Long Ruột Đỏ" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nguồn Gốc <span className="text-red-500">*</span>
          </label>
          <input type="text" value={formData.origin} onChange={e => handleInputChange('origin', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="VD: Hợp Tác Xã Bình Thuận" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày Thu Hoạch <span className="text-red-500">*</span>
          </label>
          <input type="date" value={formData.harvestDate?.split('/').reverse().join('-')} onChange={e => handleInputChange('harvestDate', e.target.value.split('-').reverse().join('/'))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hạn Sử Dụng <span className="text-red-500">*</span>
          </label>
          <input type="date" value={formData.expiryDate?.split('/').reverse().join('-')} onChange={e => handleInputChange('expiryDate', e.target.value.split('-').reverse().join('/'))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nhiệt Độ (°C)
          </label>
          <input type="text" value={formData.conditions?.temperature} onChange={e => handleConditionChange('temperature', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="VD: 18-22°C" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Độ Ẩm (%)
          </label>
          <input type="text" value={formData.conditions?.humidity} onChange={e => handleConditionChange('humidity', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="VD: 85-90%" />
        </div>
      </div>
    </div>;
  const renderStep2 = () => <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 max-h-[60vh] overflow-y-auto pr-2">
      {formData.stages?.map((stage, idx) => <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-3 font-medium text-gray-900">
            {idx === 0 && <Sprout className="w-4 h-4 text-green-600" />}
            {idx === 1 && <Factory className="w-4 h-4 text-orange-600" />}
            {idx === 2 && <Truck className="w-4 h-4 text-blue-600" />}
            {idx === 3 && <Store className="w-4 h-4 text-purple-600" />}
            {stage.name}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Địa Điểm
              </label>
              <input type="text" value={stage.location} onChange={e => handleStageChange(idx, 'location', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder={`Nhập địa điểm ${stage.name}`} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Ngày
              </label>
              <input type="date" value={stage.date?.split('/').reverse().join('-')} onChange={e => handleStageChange(idx, 'date', e.target.value.split('-').reverse().join('/'))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Trạng Thái
              </label>
              <select value={stage.status} onChange={e => handleStageChange(idx, 'status', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                <option value="pending">Chờ xử lý</option>
                <option value="current">Đang thực hiện</option>
                <option value="completed">Hoàn thành</option>
              </select>
            </div>
            {/* Dynamic details fields based on stage type */}
            {Object.keys(stage.details).map(key => <div key={key}>
                <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">
                  {key}
                </label>
                <input type="text" value={stage.details[key]} onChange={e => handleStageDetailChange(idx, key, e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
              </div>)}
          </div>
        </div>)}
    </div>;
  const renderStep3 = () => <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center">
        <Check className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
        <h3 className="text-lg font-bold text-emerald-900">
          Xác nhận tạo lô hàng
        </h3>
        <p className="text-sm text-emerald-700">
          Vui lòng kiểm tra kỹ thông tin trước khi tạo. Dữ liệu sẽ được ghi lên
          blockchain.
        </p>
      </div>

      <div className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
          <div>
            <span className="text-gray-500 block">Mã Lô Hàng</span>
            <span className="font-mono font-medium">{formData.batchId}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Sản Phẩm</span>
            <span className="font-medium">{formData.product}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Nguồn Gốc</span>
            <span className="font-medium">{formData.origin}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Ngày Thu Hoạch</span>
            <span className="font-medium">{formData.harvestDate}</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Tiến độ dự kiến</h4>
          <div className="space-y-2">
            {formData.stages?.map((stage, idx) => <div key={idx} className="flex items-center justify-between text-gray-600">
                <span>{stage.name}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${stage.status === 'completed' ? 'bg-green-100 text-green-800' : stage.status === 'current' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                  {stage.status === 'completed' ? 'Hoàn thành' : stage.status === 'current' ? 'Đang thực hiện' : 'Chờ xử lý'}
                </span>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Tạo Lô Hàng Mới</h2>
            <div className="flex items-center gap-2 mt-1">
              {STEPS.map(s => <div key={s.id} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${step === s.id ? 'bg-emerald-600 text-white' : step > s.id ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-500'}`}>
                    {step > s.id ? <Check className="w-3 h-3" /> : s.id}
                  </div>
                  {s.id < STEPS.length && <div className={`w-8 h-0.5 mx-1 ${step > s.id ? 'bg-emerald-200' : 'bg-gray-200'}`} />}
                </div>)}
              <span className="ml-2 text-sm font-medium text-gray-600">
                {STEPS[step - 1].title}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button onClick={() => step > 1 ? setStep(step - 1) : onClose()} className="px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
            {step > 1 ? <ChevronLeft className="w-4 h-4" /> : null}
            {step > 1 ? 'Quay lại' : 'Hủy bỏ'}
          </button>

          <button onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()} disabled={isSubmitting || step === 1 && (!formData.product || !formData.origin)} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
            {isSubmitting ? 'Đang xử lý...' : step < 3 ? <>
                Tiếp tục <ChevronRight className="w-4 h-4" />
              </> : <>
                Xác Nhận & Tạo <Check className="w-4 h-4" />
              </>}
          </button>
        </div>
      </div>
    </div>;
}