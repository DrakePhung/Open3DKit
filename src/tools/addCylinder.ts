/** Cylinder creation tool using the shared scene document. */
import { Mesh, CylinderGeometry, MeshStandardMaterial } from 'three';
import type { ToolDefinition } from '../core';
export const addCylinder: ToolDefinition = {
  id: 'primitives.add-cylinder', label: 'Hình trụ', category: 'Bề mặt cong',
  description: 'Tạo hình trụ làm điểm bắt đầu cho trục, chân đế và chi tiết tròn.',
  run({ document }) {
    const mesh = new Mesh(new CylinderGeometry(0.8, 0.8, 2, 40), new MeshStandardMaterial({ color: '#d9ad73', roughness: 0.4 }));
    mesh.name = `Hình trụ ${document.objects.length + 1}`;
    mesh.position.set(document.objects.length * 2.5, 1, 0);
    document.add(mesh);
  },
};
