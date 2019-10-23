import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';

export default class MatrixItem extends RockApolloDataSource {
  expanded = true;

  getMatrixItems = async (matrixItemGuid) => {
    const matrixItems = await this.request('/AttributeMatrixItems')
      .filter(`AttributeMatrix/Guid eq guid'${matrixItemGuid}'`)
      .get();
    return matrixItems;
  };
}
