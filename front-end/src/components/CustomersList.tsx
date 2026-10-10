import type { Customer } from '../types/Customer'


type CustomerListProps = {
 customers?: Customer[]
}


export function CustomerList({ customers = [] }: CustomerListProps) {
 return (
   <p className="text-secondary">
     Total de clientes: {customers.length}
   </p>
 )
}
