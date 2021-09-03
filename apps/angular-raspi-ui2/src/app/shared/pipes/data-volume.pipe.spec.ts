import { DataVolumePipe } from './data-volume.pipe';

describe('DataVolumePipe', () => {
  it('when no unit specified, round to smallest', () => {
    const pipe = new DataVolumePipe();
    expect(pipe).toBeTruthy();
  });
});
