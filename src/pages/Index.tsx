import { useState } from 'react';
import { Calendar, MapPin, Users, Plus, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Visit {
  id: string;
  companyName: string;
  visitDate: string;
  visitTime: string;
  purpose: string;
  attendees: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  location: string;
  notes: string;
}

const SAMPLE_VISITS: Visit[] = [
  {
    id: '1',
    companyName: 'TechCorp Industries',
    visitDate: '2026-08-28',
    visitTime: '10:00 AM',
    purpose: 'Partnership Discussion',
    attendees: 3,
    status: 'scheduled',
    location: 'Conference Room A, San Francisco',
    notes: 'Discuss Q4 collaboration opportunities'
  },
  {
    id: '2',
    companyName: 'Global Solutions Ltd',
    visitDate: '2026-08-26',
    visitTime: '2:30 PM',
    purpose: 'Product Demo',
    attendees: 5,
    status: 'completed',
    location: 'Main Office, New York',
    notes: 'Successfully demonstrated new features'
  },
  {
    id: '3',
    companyName: 'Innovation Hub',
    visitDate: '2026-08-30',
    visitTime: '11:00 AM',
    purpose: 'Client Meeting',
    attendees: 2,
    status: 'scheduled',
    location: 'Downtown Office, Boston',
    notes: 'Review project requirements and timeline'
  },
  {
    id: '4',
    companyName: 'Digital Ventures',
    visitDate: '2026-08-25',
    visitTime: '9:00 AM',
    purpose: 'Training Session',
    attendees: 8,
    status: 'cancelled',
    location: 'Training Center, Austin',
    notes: 'Rescheduled to September due to conflict'
  }
];

export default function Index() {
  const [visits, setVisits] = useState<Visit[]>(SAMPLE_VISITS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredVisits = visits.filter(visit => {
    const matchesSearch = visit.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visit.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || visit.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return variants[status as keyof typeof variants];
  };

  const stats = {
    total: visits.length,
    scheduled: visits.filter(v => v.status === 'scheduled').length,
    completed: visits.filter(v => v.status === 'completed').length,
    cancelled: visits.filter(v => v.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-8 h-8 text-blue-600" />
                Visit Manager
              </h1>
              <p className="text-slate-600 mt-1">Track and manage company visits</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Visit
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Visits</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
              </div>
              <Calendar className="w-10 h-10 text-blue-200" />
            </div>
          </Card>
          <Card className="bg-white border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Scheduled</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.scheduled}</p>
              </div>
              <Clock className="w-10 h-10 text-blue-200" />
            </div>
          </Card>
          <Card className="bg-white border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-200" />
            </div>
          </Card>
          <Card className="bg-white border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Cancelled</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.cancelled}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-200" />
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search companies or purpose..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-slate-200"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'scheduled', 'completed', 'cancelled'].map(status => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status ? 'bg-blue-600 text-white' : 'border-slate-200'}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Visits List */}
        <div className="space-y-4">
          {filteredVisits.length === 0 ? (
            <Card className="bg-white border-slate-200 p-12 text-center">
              <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">No visits found</p>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters</p>
            </Card>
          ) : (
            filteredVisits.map(visit => (
              <Card key={visit.id} className="bg-white border-slate-200 hover:shadow-md transition-shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{visit.companyName}</h3>
                      <Badge className={`${getStatusBadge(visit.status)} border-0`}>
                        {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{visit.purpose}</p>
                  </div>
                  {getStatusIcon(visit.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Date</p>
                      <p className="text-sm font-medium">{visit.visitDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Time</p>
                      <p className="text-sm font-medium">{visit.visitTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Users className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Attendees</p>
                      <p className="text-sm font-medium">{visit.attendees} people</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Location</p>
                      <p className="text-sm font-medium">{visit.location}</p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 text-sm italic">{visit.notes}</p>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* What's Next Section */}
      <div className="bg-slate-900 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">What's next?</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>Add new visit form with date/time picker and company selection</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>Edit and delete visit functionality with confirmation dialogs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>Company directory with contact information and visit history</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>Calendar view with drag-and-drop visit scheduling</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">•</span>
              <span>Export visits to PDF or CSV for reports and tracking</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
