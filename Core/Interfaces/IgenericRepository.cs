using Core.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IgenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();

        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
        // Task<T> ListAsync(ProductsWithTypesAndBrandsSpecification spec);
    }
}