/** Sphere creation tool using the shared scene document. */
import { Mesh, SphereGeometry, MeshStandardMaterial } from 'three';
import type { ToolDefinition } from '../core';
export const addSphere: ToolDefinition = {
  id: 'primitives.add-sphere', label: 'Hình cầu', category: 'Bề mặt cong',
  description: 'Tạo hình cầu và khám phá bề mặt cong trong không gian 3D.',
  run({ document }) {
    const mesh = new Mesh(new SphereGeometry(1, 32, 24), new MeshStandardMaterial({ color: '#8bc8ad', roughness: 0.4 }));
    mesh.name = `Hình cầu ${document.objects.length + 1}`;
    mesh.position.set(document.objects.length * 2.5, 1, 0);
    document.add(mesh);
  },
};
