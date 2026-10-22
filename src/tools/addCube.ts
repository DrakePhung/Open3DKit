/** Example extension: add a cube through the public core tool contract. */
import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';
import type { ToolDefinition } from '../core';
export const addCube: ToolDefinition = {
  id: 'primitives.add-cube',
  label: 'Khối hộp',
  description: 'Tạo khối hộp làm nền cho mô hình, đồ gá và các chi tiết hình học.',
  category: 'Khối đa diện',
  run({ document }) {
    const cube = new Mesh(new BoxGeometry(1.5, 1.5, 1.5), new MeshStandardMaterial({ color: '#89a9ff', roughness: 0.35, metalness: 0.15 }));
    cube.name = `Khối hộp ${document.objects.length + 1}`;
    cube.position.set(document.objects.length * 2, 0.75, 0);
    document.add(cube);
  },
};
