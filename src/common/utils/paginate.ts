export function paginate<T>(data: T[], page = 1, limit = 8) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results: any = {};
  
    if (endIndex < data.length) {
      results.next = { page: page + 1, limit };
    }
  
    if (startIndex > 0) {
      results.previous = { page: page - 1, limit };
    }
  
    results.totalPages = Math.ceil(data.length / limit);
    results.results = [...data].reverse().slice(startIndex, endIndex);
  
    return results;
  }
  