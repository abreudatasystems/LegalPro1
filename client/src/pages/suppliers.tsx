
import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search, Building2, Mail, Phone } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "1",
      name: "Fornecedor Alpha",
      email: "contato@alpha.com",
      phone: "(11) 99999-1111",
      cnpj: "12.345.678/0001-90",
      address: "Rua das Flores, 123 - SP",
      status: "active",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Fornecedor Beta",
      email: "contato@beta.com",
      phone: "(21) 88888-2222",
      cnpj: "98.765.432/0001-10",
      address: "Av. Brasil, 456 - RJ",
      status: "inactive",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cnpj: "",
    address: "",
    status: "active" as const,
  });

  const handleCreateNew = () => {
    setEditingSupplier(null);
    setFormData({ name: "", email: "", phone: "", cnpj: "", address: "", status: "active" });
    setShowForm(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      cnpj: supplier.cnpj,
      address: supplier.address,
      status: supplier.status,
    });
    setShowForm(true);
  };

  const handleDelete = (supplier: Supplier) => {
    if (confirm(`Excluir fornecedor ${supplier.name}?`)) {
      setSuppliers(suppliers.filter(s => s.id !== supplier.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSupplier) {
      setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? { ...editingSupplier, ...formData } : s));
    } else {
      setSuppliers([
        ...suppliers,
        { ...formData, id: Date.now().toString(), createdAt: new Date().toISOString() },
      ]);
    }
    setShowForm(false);
    setEditingSupplier(null);
  };

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.cnpj.includes(searchTerm)
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          title="Fornecedores" 
          subtitle="Gestão de fornecedores e parceiros"
          action={
            <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Fornecedor
            </Button>
          }
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total de Fornecedores</p>
                      <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Badge className="bg-green-100 text-green-800">Ativos</Badge>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Ativos</p>
                      <p className="text-2xl font-bold text-gray-900">{suppliers.filter(s => s.status === 'active').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <Badge className="bg-gray-100 text-gray-800">Inativos</Badge>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Inativos</p>
                      <p className="text-2xl font-bold text-gray-900">{suppliers.filter(s => s.status === 'inactive').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Barra de Pesquisa */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Pesquisar por nome, email ou CNPJ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lista de Fornecedores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Fornecedores ({filteredSuppliers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>CNPJ</TableHead>
                      <TableHead>Endereço</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 mr-1" />
                            {supplier.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Phone className="w-3 h-3 mr-1" />
                            {supplier.phone}
                          </div>
                        </TableCell>
                        <TableCell>{supplier.cnpj}</TableCell>
                        <TableCell>{supplier.address}</TableCell>
                        <TableCell>
                          <Badge variant={supplier.status === 'active' ? 'default' : 'outline'}>
                            {supplier.status === 'active' ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(supplier)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(supplier)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Dialog do Formulário */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingSupplier ? "Editar Fornecedor" : "Novo Fornecedor"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" value={formData.cnpj} onChange={e => setFormData({ ...formData, cnpj: e.target.value })} required />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select id="status" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })} className="w-full border rounded p-2">
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {editingSupplier ? "Atualizar" : "Criar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
